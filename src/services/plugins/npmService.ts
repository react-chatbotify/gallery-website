import { ApiPlugin } from '@/interfaces/ApiPlugin';
import { Plugin } from '@/interfaces/Plugin';

import { Endpoints } from '../../constants/Endpoints';

/**
 * Fetches theme data stored on github via jsdelivr cache.
 *
 * @param themeId id of theme to fetch data for
 */
const getNpmPluginData = async (apiPlugin: ApiPlugin): Promise<Plugin | Partial<Plugin>> => {
  // check if plugin is valid
  if (!apiPlugin.id || typeof apiPlugin.id !== 'string') {
    // This case should ideally not happen if data is validated upstream
    // but as a safeguard:
    console.error('Invalid plugin ID provided to getNpmPluginData:', apiPlugin);
    return {
      id: apiPlugin.id || 'unknown-id',
      name: apiPlugin.name || apiPlugin.id || 'Plugin Name Unavailable',
      authorName: 'N/A',
      description: apiPlugin.description || 'No description available.',
      version: 'N/A',
      isDataMissing: true,
      favoritesCount: apiPlugin.favoritesCount,
      isFavorite: apiPlugin.isFavorite ?? false,
      userId: apiPlugin.userId,
      createdAt: apiPlugin.createdAt,
      updatedAt: apiPlugin.updatedAt,
      keywords: [],
      packageUrl: apiPlugin.packageUrl,
    };
  }

  try {
    // fetch package data from npm registry
    const response = await fetch(`${Endpoints.fetchNpmPlugins}/${encodeURIComponent(apiPlugin.id)}/latest`);
    if (!response.ok) {
      throw new Error(`NPM API request failed with status ${response.status}`);
    }
    const pluginData = await response.json();
    const authorImg = `https://avatars.githubusercontent.com/${pluginData.author.name}`;
    const imageUrl = pluginData.pluginLogo || null; // Assuming pluginLogo can be null/undefined

    return {
      id: apiPlugin.id,
      name: pluginData.name || apiPlugin.name || apiPlugin.id, // Use fetched name, fallback to apiPlugin name then id
      authorName: pluginData.author?.name || 'N/A',
      description: pluginData.description || 'No description available.',
      version: pluginData.version || 'N/A',
      isDataMissing: false,
      favoritesCount: apiPlugin.favoritesCount,
      isFavorite: apiPlugin.isFavorite ?? false,
      userId: apiPlugin.userId,
      createdAt: apiPlugin.createdAt,
      updatedAt: apiPlugin.updatedAt,
      imageUrl,
      authorImg,
      github: pluginData.repository?.url || pluginData.repository || null, // Handle repository being object or string
      keywords: pluginData.keywords || [],
      packageUrl: apiPlugin.packageUrl,
    };
  } catch (error) {
    console.error(`Error fetching plugin data from NPM for ${apiPlugin.id}:`, error);
    return {
      id: apiPlugin.id,
      name: apiPlugin.name || apiPlugin.id || 'Plugin Name Unavailable',
      authorName: 'N/A',
      description: 'Plugin details are currently unavailable due to an external service issue.',
      version: 'N/A',
      isDataMissing: true,
      favoritesCount: apiPlugin.favoritesCount,
      isFavorite: apiPlugin.isFavorite ?? false,
      userId: apiPlugin.userId,
      createdAt: apiPlugin.createdAt,
      updatedAt: apiPlugin.updatedAt,
      keywords: [],
      packageUrl: apiPlugin.packageUrl,
    };
  }
};

export { getNpmPluginData };
