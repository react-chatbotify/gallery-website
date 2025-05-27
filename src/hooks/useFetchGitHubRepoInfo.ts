import { useEffect, useState } from 'react';

import { ProjectContributor } from '@/interfaces/repository/ProjectContributor';
import { RepositoryInfo } from '@/interfaces/repository/RepositoryInfo';

/**
 * Fetch contributors, stars, forks, and description directly from GitHub.
 * Caches results in localStorage under key `github_<owner>_<repo>`.
 * Falls back to stale cache if fetch fails.
 *
 * @param name user-friendly display name for the repo
 * @param fullRepo identifier in the form "owner/repo"
 */
const useFetchGitHubRepoInfo = (name: string, fullRepo: string): RepositoryInfo => {
  const repoUrl = `https://github.com/${fullRepo}`;
  const [contributors, setContributors] = useState<ProjectContributor[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cacheKey = `github_${fullRepo.replace('/', '_')}`;

    const applyCache = (): boolean => {
      const cachedData = localStorage.getItem(cacheKey);
      if (!cachedData) return false;
      try {
        const { contributors, stars, forks, description } = JSON.parse(cachedData);
        setContributors(contributors);
        setTotalCount(contributors.length);
        setStars(stars);
        setForks(forks);
        setDescription(description);
        return true;
      } catch (e) {
        console.error('Failed to parse cached data:', e);
        localStorage.removeItem(cacheKey); // Clear corrupted cache
        localStorage.removeItem(`${cacheKey}_ts`);
        return false;
      }
    };

    // Attempt to load from cache first.
    const
      isCacheApplied = applyCache();

    if (isCacheApplied) {
      setLoading(false); // Data loaded from cache, no initial loading state needed.
      // Check for cache freshness
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_ts`);
      const oneHour = 1000 * 60 * 60;
      if (cacheTimestamp && Date.now() - Number(cacheTimestamp) < oneHour) {
        // Cache is fresh and applied, skip fetchAll
        return;
      }
      // Cache is stale, proceed to fetchAll, loading is already false
    } else {
      setLoading(true); // No cache or failed to apply, show loading state, must fetch.
    }

    const fetchAll = async () => {
      // If cache wasn't applied, we are in an initial loading state (setLoading(true) already called).
      // If cache was applied but stale, loading is currently false, this is a background update.
      // No need to set loading to true here again if cache was stale and applied.
      // setLoading(true) is only for the case where there was no cache initially.
      if (!isCacheApplied) {
        // This condition is already handled by the setLoading(true) in the else block above.
        // Redundant setLoading(true) removed here.
      }
      setError(null);

      try {
        // fetch repo info
        const infoRes = await fetch(`https://api.github.com/repos/${fullRepo}`);
        if (!infoRes.ok) throw new Error(infoRes.statusText);
        const infoJson = await infoRes.json();

        // fetch contributors
        const contribRes = await fetch(`https://api.github.com/repos/${fullRepo}/contributors?per_page=100`);
        if (!contribRes.ok) throw new Error(contribRes.statusText);
        const contribJson = await contribRes.json();

        const formatted: ProjectContributor[] = contribJson.map((c: any) => ({
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          login: c.login,
        }));

        // update state
        setContributors(formatted);
        setTotalCount(formatted.length);
        setStars(infoJson.stargazers_count);
        setForks(infoJson.forks_count);
        setDescription(infoJson.description || '');

        // cache data
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            contributors: formatted,
            description: infoJson.description || '',
            forks: infoJson.forks_count,
            stars: infoJson.stargazers_count,
          })
        );
        localStorage.setItem(`${cacheKey}_ts`, String(Date.now()));
      } catch (err) {
        // on error, fallback to stale cache (if it was already applied)
        setError(err as Error);
        // No need to call applyCache() again here, if it failed initially, it's already handled.
        // If it was applied, the stale data is already there.
        if (isCacheApplied) {
          console.warn(`Fetch failed for ${fullRepo}, continuing to show stale cache.`);
        }
      } finally {
        setLoading(false); // Always set loading to false after fetch attempt.
      }
    };

    // fetchAll is called only if cache was not applied, or if it was applied but stale.
    // If cache was applied and fresh, the useEffect hook returns early.
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullRepo]); // name is not a dependency for fetching

  return {
    contributors,
    description,
    error,
    forks,
    loading,
    name,
    repoUrl,
    stars,
    totalCount,
  };
};

export default useFetchGitHubRepoInfo;
