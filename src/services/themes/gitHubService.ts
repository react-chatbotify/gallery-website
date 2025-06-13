import { Endpoints } from '../../constants/Endpoints';
import { ApiTheme } from '../../interfaces/ApiTheme';
import { Theme } from '../../interfaces/Theme';

/**
 * Creates a partial theme object for error scenarios.
 */
const createPartialTheme = (apiTheme: ApiTheme): Partial<Theme> => ({
  authorName: 'N/A',
  version: 'N/A',
  isDataMissing: true,
  isFavorite: apiTheme.isFavorite ?? false,
  github: 'N/A',
  tags: [],
  content: {
    cssStyles: '', // Placeholder URLs or empty strings
    inlineStyles: '',
    settings: '',
  },
  // Spread any other available fields from apiTheme
  ...apiTheme,
});

/**
 * Fetches theme data stored on github via jsdelivr cache.
 *
 * @param apiTheme The API theme object containing ID and other backend data.
 */
const getGitHubThemeData = async (apiTheme: ApiTheme): Promise<Theme | Partial<Theme>> => {
  const themeId = apiTheme.id;
  const cdnUrl = Endpoints.fetchCacheThemes;

  if (!themeId || typeof themeId !== 'string') {
    console.error('Invalid theme ID provided to getGitHubThemeData:', apiTheme);
    return createPartialTheme(apiTheme);
  }

  try {
    // Fetch meta info
    const metaFile = 'meta.json';
    const metaUrl = `${cdnUrl}/${themeId}/${metaFile}`;
    const metaResponse = await fetch(metaUrl);
    if (!metaResponse.ok) {
      throw new Error(`Failed to fetch meta.json for theme ${themeId}: ${metaResponse.status}`);
    }
    const meta = await metaResponse.json();

    // Basic validation of meta structure (can be more comprehensive)
    if (!meta.version || !meta.author || !meta.name) {
      throw new Error(`Invalid meta.json structure for theme ${themeId}`);
    }

    const contentUrl = `${cdnUrl}/${themeId}/${meta.version}`;

    // Define content files (URLs are constructed, actual fetching might not be needed here if URLs are used directly)
    const displayFile = 'display.png';
    const settingsFile = 'settings.json';
    const inlineStylesFile = 'styles.json';
    const cssStylesFile = 'styles.css';

    const displayUrl = `${contentUrl}/${displayFile}`;
    const settingsUrl = `${contentUrl}/${settingsFile}`;
    const inlineStylesUrl = `${contentUrl}/${inlineStylesFile}`;
    const cssStylesUrl = `${contentUrl}/${cssStylesFile}`;

    const authorImg = `https://avatars.githubusercontent.com/${meta.github}`;

    // TODO: explore whether tags should be stored in database or via meta.json on github
    const tags = meta.tags || ['beta']; // Fallback if meta.tags is not present

    return {
      id: themeId,
      name: meta.name || apiTheme.name || themeId, // Prefer meta name, fallback to apiTheme name, then ID
      authorName: meta.author || 'N/A',
      description: meta.description || 'No description available.',
      version: meta.version || 'N/A',
      isDataMissing: false,
      favoritesCount: apiTheme.favoritesCount || 0,
      isFavorite: apiTheme.isFavorite ?? false,
      themeImg: displayUrl, // Assuming displayUrl is always valid if meta is fetched
      authorImg,
      github: meta.github || 'N/A',
      tags,
      content: {
        cssStyles: cssStylesUrl,
        inlineStyles: inlineStylesUrl,
        settings: settingsUrl,
      },
    };
  } catch (error) {
    console.error(`Error fetching or processing theme data for ${themeId} from CDN/GitHub:`, error);
    return createPartialTheme(apiTheme);
  }
};

export { getGitHubThemeData };
