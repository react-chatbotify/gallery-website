import { Endpoints } from '@/constants/Endpoints';
import { Placeholders } from '@/constants/Placeholders';
import { ApiTheme } from '@/interfaces/ApiTheme';
import { Theme } from '@/interfaces/Theme';
import { galleryApiFetch } from '@/utils';

import { resetThemesCache } from '../themes/cacheService';
import { getGitHubThemeData } from '../themes/gitHubService';

const fetchThemesFromApi = async (url: string): Promise<Theme[]> => {
  try {
    let apiThemes = null;

    if (url.startsWith('http')) {
      const response = await galleryApiFetch(url);
      const result = await response.json();
      apiThemes = result.data;
    } else {
      apiThemes = Placeholders.themes;
    }

    // now fetch the details of each theme
    if (apiThemes) {
      // extra check needed because if a specific theme id is requested it is not an array
      apiThemes = Array.isArray(apiThemes) ? apiThemes : [apiThemes];
      return await fetchThemesFromGitHub(apiThemes);
    } else {
      throw new Error('couldnt fetch themes');
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

/**
 * Fetches themes information from github (or more accurately, jsdelivr cache).
 */
const fetchThemesFromGitHub = async (apiThemes: ApiTheme[]): Promise<Theme[]> => {
  // todo: good to cache themes already fetched to reduce calls to cdn
  return await Promise.all(apiThemes.map((apiTheme) => getGitHubThemeData(apiTheme)));
};

const addThemeToFavorites = async (theme: Theme) => {
  resetThemesCache();
  try {
    // Construct the URL
    const url = Endpoints.favoriteThemes;

    // Make a POST request with the themeId
    const response = await galleryApiFetch(url, {
      body: JSON.stringify({ themeId: theme.id }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to add theme to favorites: ${errorDetails.message}`);
    }

    // Return the response data if needed
    return await response.json();
  } catch (err) {
    console.error('Error adding theme to favorites:', err);
    throw new Error('Could not add theme to favorites');
  }
};

const removeThemeFromFavorites = async (theme: Theme) => {
  resetThemesCache();
  try {
    // Construct the URL with the themeId as a query parameter
    const themeId = encodeURIComponent(theme.id);
    const url = `${Endpoints.favoriteThemes}?themeId=${themeId}`;

    // Make a DELETE request
    const response = await galleryApiFetch(url, {
      method: 'DELETE',
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to remove theme from favorites: ${errorDetails.message}`);
    }

    // Optionally return response data if needed
    return await response.json();
  } catch (err) {
    console.error('Error removing theme from favorites:', err);
    throw new Error('Could not remove theme from favorites');
  }
};

export { addThemeToFavorites, fetchThemesFromApi, removeThemeFromFavorites };
