import { Theme } from '@/interfaces/Theme';

let themeCache: Record<string, Theme[]> = {};

const fetchThemesFromCache = (cacheKey: string) => {
  return themeCache[cacheKey];
};

const saveThemesToCache = (cacheKey: string, themes: Theme[]) => {
  themeCache[cacheKey] = themes;
};

const resetThemesCache = () => {
  themeCache = {};
};

const shouldCacheTheme = (url: string, sortBy?: string) => {
  if (sortBy === 'favoritesCount') {
    return false;
  }

  return true;
};

export { fetchThemesFromCache, resetThemesCache, saveThemesToCache, shouldCacheTheme };
