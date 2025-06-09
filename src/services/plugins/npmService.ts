import { ApiPlugin } from '@/interfaces/ApiPlugin';

import { Endpoints } from '../../constants/Endpoints';

/**
 * Fetches theme data stored on github via jsdelivr cache.
 *
 * @param themeId id of theme to fetch data for
 */
const getNpmPluginData = async (plugin: ApiPlugin) => {
  // check if plugin is valid
  if (!plugin.id || typeof plugin.id !== 'string') {
    throw new Error('Invalid plugin ID provided');
  }

  // fetch package data from npm registry
  const response = await fetch(`${Endpoints.fetchNpmPlugins}/${encodeURIComponent(plugin.id)}/latest`);
  const pluginData = await response.json();

  const authorImg = `https://avatars.githubusercontent.com/${pluginData.author.name}`;
  const imageUrl = pluginData.pluginLogo || '';

  return {
    authorImg,
    authorName: pluginData.author.name,
    createdAt: plugin.createdAt,
    description: pluginData.description,
    favoritesCount: plugin.favoritesCount,
    github: pluginData.repository,
    id: plugin.id,
    imageUrl,
    isFavorite: plugin.isFavorite ?? false,
    keywords: pluginData.keywords,
    name: pluginData.name,
    packageUrl: plugin.packageUrl,
    updatedAt: plugin.updatedAt,
    userId: plugin.userId,
    version: pluginData.version,
  };
};

export { getNpmPluginData };
