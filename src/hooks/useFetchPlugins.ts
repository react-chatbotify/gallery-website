import { useCallback, useState } from 'react';

import { fetchPluginsFromApi } from '@/services/plugins/apiService';
import { fetchPluginsFromCache, savePluginsToCache } from '@/services/plugins/cacheService';
import { getConstructedUrl } from '@/utils';

import { Plugin } from '../interfaces/Plugin';

const generateCacheKey = (url: string, params: Record<string, any>) =>
  `${url}?${new URLSearchParams(params).toString()}`;

/**
 * Fetch plugins with caching.
 */
const useFetchPlugins = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlugins = useCallback(
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
    }): Promise<Plugin[]> => {
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
          const cachedResult = fetchPluginsFromCache(cacheKey);
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
        const fetchedPlugins = await fetchPluginsFromApi(finalUrl);

        // save to cache
        if (sortBy !== 'favoritesCount') {
          savePluginsToCache(cacheKey, fetchedPlugins);
        }

        return fetchedPlugins;
      } catch (err: any) {
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
    fetchPlugins,
    isLoading,
  };
};

export default useFetchPlugins;
