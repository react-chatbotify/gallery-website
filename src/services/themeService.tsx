import { ApiTheme } from "../interfaces/ApiTheme";
import { Endpoints } from "../constants/Endpoints";

/**
 * Fetches theme data stored on github via jsdelivr cache.
 * 
 * @param themeId id of theme to fetch data for
 */
const getGitHubThemeData = async (apiTheme: ApiTheme) => {
	const themeId = apiTheme.id;
	const cdnUrl = Endpoints.fetchCacheThemes;

	// fetch meta info
	const metaFile = 'meta.json';
	const metaUrl = `${cdnUrl}/${themeId}/${metaFile}`;
	const meta = await (await fetch(metaUrl)).json();

	const contentUrl = `${cdnUrl}/${themeId}/${meta.version}`;
  
	// fetch contents
	const displayFile = 'display.png';
	const settingsFile = 'settings.json';
	const inlineStylesFile = 'styles.json';
	const cssStylesFile = 'styles.css';

	const displayUrl = `${contentUrl}/${displayFile}`;
	const settingsUrl = `${contentUrl}/${settingsFile}`;
	const inlineStylesUrl = `${contentUrl}/${inlineStylesFile}`;
	const cssStylesUrl = `${contentUrl}/${cssStylesFile}`;

	// todo: fetch from github url (can use jsdelivr cache too)
  
	const authorImg = `https://avatars.githubusercontent.com/${meta.github}`

	// todo: explore whether tags should be stored in database or via meta.json on github
	const tags = ['beta'];

	return {
		id: themeId,
		name: meta.name,
		tags,
		version: meta.version,
		themeImg: displayUrl,
		authorName: meta.author,
		authorImg,
		description: meta.description,
		favorites_count: apiTheme.favorites_count,
		github: meta.github,
		content: {
			settings: settingsUrl,
			inlineStyles: inlineStylesUrl,
			cssStyles: cssStylesUrl
		}
	}
}

export { getGitHubThemeData }
