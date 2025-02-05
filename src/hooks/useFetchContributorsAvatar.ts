import { Endpoints } from "@/constants/Endpoints";
import { galleryApiFetch } from "@/utils";
import { useEffect, useState } from "react";

/**
 * Fetches contributors data with caching.
 *
 * @param repo repo name to fetch contributors from.
 */
const useFetchContributorsAvatars = (repo: string) => {
  const [contributors, setContributors] = useState<{
    avatar_url: string;
    login: string;
    html_url: string;
  }[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true);
      setError(null);

      try {
        // check local storage for cached data
        const cacheKey = `contributors_${repo}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        const oneHour = 60 * 60 * 1000;

        if (cachedData && cacheTimestamp && Date.now() - Number(cacheTimestamp) < oneHour) {
          // use cached data if it's still valid
          const cachedContributors = JSON.parse(cachedData);
          setContributors(cachedContributors);
          setTotalCount(cachedContributors.length);
        } else {
          // fetch new data from the API
          const response = await galleryApiFetch(
            `${Endpoints.fetchProjectDetails}?projectName=${repo}`
          );

          if (!response.ok) {
            throw new Error(`Error fetching contributors: ${response.statusText}`);
          }

          const projectDetails = await response.json();
          const formattedContributors = projectDetails.data.contributors.map((contributor: {
            avatar_url: string;
            login: string;
            html_url: string;
          }) => ({
            avatar_url: contributor.avatar_url,
            login: contributor.login,
            html_url: contributor.html_url,
          }));

          // update state
          setContributors(formattedContributors);
          setTotalCount(formattedContributors.length);

          // cache the results
          localStorage.setItem(cacheKey, JSON.stringify(formattedContributors));
          localStorage.setItem(`${cacheKey}_timestamp`, String(Date.now()));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [repo]);

  return { contributors, totalCount, loading, error };
};

export default useFetchContributorsAvatars;
