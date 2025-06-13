import { Endpoints } from '@/constants/Endpoints';
import { Placeholders } from '@/constants/Placeholders';
import { ApiPlugin } from '@/interfaces/ApiPlugin';
import { Plugin } from '@/interfaces/Plugin';
import { galleryApiFetch } from '@/utils';

import { resetPluginsCache } from '../plugins/cacheService';
import { getNpmPluginData } from './npmService';

const fetchPluginsFromApi = async (url: string): Promise<(Plugin | Partial<Plugin>)[]> => {
  try {
    let apiPlugins = null;

    if (url.startsWith('http')) {
      const response = await galleryApiFetch(url);
      const result = await response.json();
      apiPlugins = result.data;
    } else {
      apiPlugins = Placeholders.plugins;
    }

    // now fetch the details of each plugin
    if (apiPlugins) {
      // extra check needed because if a specific theme id is requested it is not an array
      apiPlugins = Array.isArray(apiPlugins) ? apiPlugins : [apiPlugins];
      return await fetchPluginsFromNpm(apiPlugins);
    } else {
      throw new Error('couldnt fetch plugins');
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

/**
 * Fetches plugins information from npm.
 */
const fetchPluginsFromNpm = async (apiPlugins: ApiPlugin[]): Promise<(Plugin | Partial<Plugin>)[]> => {
  const settledResults = await Promise.allSettled(apiPlugins.map((apiPlugin) => getNpmPluginData(apiPlugin)));

  return settledResults.map((result, index) => {
    const apiPlugin = apiPlugins[index]; // Get the original apiPlugin for fallback data

    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      // Handle rejected promise from getNpmPluginData
      // This case should be rare if getNpmPluginData's try/catch is effective
      console.error(`Error processing plugin ${apiPlugin.id} after NPM fetch attempt:`, result.reason);
      return {
        id: apiPlugin.id,
        name: apiPlugin.name || apiPlugin.id || 'Plugin Name Unavailable',
        authorName: 'N/A',
        description: 'Plugin details are currently unavailable due to an unexpected error.',
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
  });
};

const addPluginToFavorites = async (plugin: Plugin) => {
  resetPluginsCache();
  try {
    // Construct the URL
    const url = Endpoints.favoritePlugins;

    // Make a POST request with the pluginId
    const response = await galleryApiFetch(url, {
      body: JSON.stringify({ pluginId: plugin.id }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to add plugin to favorites: ${errorDetails.message}`);
    }

    // Return the response data if needed
    return await response.json();
  } catch (err) {
    console.error('Error adding plugin to favorites:', err);
    throw new Error('Could not add plugin to favorites');
  }
};

const removePluginFromFavorites = async (plugin: Plugin) => {
  resetPluginsCache();
  try {
    // Construct the URL with the pluginId as a query parameter
    const pluginId = encodeURIComponent(plugin.id);
    const url = `${Endpoints.favoritePlugins}?pluginId=${pluginId}`;

    // Make a DELETE request
    const response = await galleryApiFetch(url, {
      method: 'DELETE',
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to remove plugin from favorites: ${errorDetails.message}`);
    }

    // Optionally return response data if needed
    return await response.json();
  } catch (err) {
    console.error('Error removing plugin from favorites:', err);
    throw new Error('Could not remove plugin from favorites');
  }
};

export { addPluginToFavorites, fetchPluginsFromApi, galleryApiFetch, removePluginFromFavorites };
