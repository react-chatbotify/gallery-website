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
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_ts`);
    const oneHour = 1000 * 60 * 60;

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
      } catch {
        return false;
      }
    };

    // if cache is fresh, use it and skip fetch
    if (cacheTimestamp && Date.now() - Number(cacheTimestamp) < oneHour) {
      if (applyCache()) {
        setLoading(false);
        return;
      }
    }

    const fetchAll = async () => {
      setLoading(true);
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
        // on error, fallback to stale cache
        setError(err as Error);
        if (applyCache()) {
          console.warn(`Fetch failed for ${fullRepo}, applied stale cache.`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [name, fullRepo]);

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
