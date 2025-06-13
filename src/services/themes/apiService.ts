import { Endpoints } from '@/constants/Endpoints';
import { Placeholders } from '@/constants/Placeholders';
import { ApiTheme } from '@/interfaces/ApiTheme';
import { Theme } from '@/interfaces/Theme';
import { galleryApiFetch } from '@/utils';

import { resetThemesCache } from '../themes/cacheService';
import { getGitHubThemeData } from '../themes/gitHubService';

const fetchThemesFromApi = async (url: string): Promise<(Theme | Partial<Theme>)[]> => {
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
const fetchThemesFromGitHub = async (apiThemes: ApiTheme[]): Promise<(Theme | Partial<Theme>)[]> => {
  const settledResults = await Promise.allSettled(apiThemes.map((apiTheme) => getGitHubThemeData(apiTheme)));

  return settledResults.map((result, index) => {
    const apiTheme = apiThemes[index]; // Get the original apiTheme for fallback data

    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      // Handle rejected promise from getGitHubThemeData
      // This case should be rare if getGitHubThemeData's try/catch is effective
      console.error(`Error processing theme ${apiTheme.id} after GitHub fetch attempt:`, result.reason);
      // Construct a partial theme, similar to how getGitHubThemeData would in its catch block
      return {
        id: apiTheme.id,
        name: apiTheme.name || apiTheme.id || 'Theme Name Unavailable',
        authorName: 'N/A',
        description: 'Theme details are currently unavailable due to an unexpected error.',
        version: 'N/A',
        isDataMissing: true,
        favoritesCount: apiTheme.favoritesCount || 0,
        isFavorite: apiTheme.isFavorite ?? false,
        github: 'N/A',
        tags: [],
        content: {
          cssStyles: '',
          inlineStyles: '',
          settings: '',
        },
        // Include other fields from apiTheme if necessary and available
        createdAt: apiTheme.createdAt,
        updatedAt: apiTheme.updatedAt,
      };
    }
  });
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
