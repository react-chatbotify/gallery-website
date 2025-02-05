
import { Plugin } from "@/interfaces/Plugin";

let pluginCache: Record<string, Plugin[]> = {};

const fetchPluginsFromCache = (cacheKey: string) => {
  return pluginCache[cacheKey];
}

const savePluginsToCache = (cacheKey: string, plugins: Plugin[]) => {
  pluginCache[cacheKey] = plugins;
}

const resetPluginsCache = () => {
  pluginCache = {};
}

const shouldCachePlugin = (url: string, sortBy?: string) => {
  if (sortBy === "favoritesCount") {
    return false;
  }

  return true;
}

export {
  fetchPluginsFromCache,
  resetPluginsCache,
  savePluginsToCache,
  shouldCachePlugin,
}