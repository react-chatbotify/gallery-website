import { useCallback, useState } from 'react';

import { fetchThemesFromApi } from '@/services/themes/apiService';
import { fetchThemesFromCache, saveThemesToCache } from '@/services/themes/cacheService';
import { getConstructedUrl } from '@/utils';

import { Theme } from '../interfaces/Theme';

const generateCacheKey = (url: string, params: Record<string, any>) =>
  `${url}?${new URLSearchParams(params).toString()}`;

/**
 * Fetch themes with caching.
 */
const useFetchThemes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetchThemes = useCallback(
    async ({
      url,
      pageSize,
      pageNum,
      searchQuery,
      sortBy,
      sortDirection,
    }: {
      url: string;
      pageSize: number;
      pageNum: number;
      searchQuery?: string;
      sortBy?: string;
      sortDirection?: string;
    }): Promise<Theme[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const cacheKey = generateCacheKey(url, {
          pageNum,
          pageSize,
          searchQuery,
          sortBy,
          sortDirection,
        });

        // check cache first (except for favorites count)
        if (sortBy !== 'favoritesCount') {
          const cachedResult = fetchThemesFromCache(cacheKey);
          if (cachedResult) {
            setIsLoading(false);
            return cachedResult;
          }
        }

        const finalUrl = getConstructedUrl(url, {
          pageNum,
          pageSize,
          searchQuery,
          sortBy,
          sortDirection,
        });

        // fetch if not in cache
        const fetchedThemes = await fetchThemesFromApi(finalUrl);

        // save to cache
        if (sortBy !== 'favoritesCount') {
          saveThemesToCache(cacheKey, fetchedThemes);
        }

        return fetchedThemes;
      } catch (err: unknown) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  ); // empty dependency array since this function doesn't depend on any external values

  return {
    error,
    fetchThemes,
    isLoading,
  };
};

export default useFetchThemes;
