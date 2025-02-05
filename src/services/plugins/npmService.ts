import { Endpoints } from "../../constants/Endpoints";
import { ApiPlugin } from "@/interfaces/ApiPlugin";

/**
 * Fetches theme data stored on github via jsdelivr cache.
 * 
 * @param themeId id of theme to fetch data for
 */
const getNpmPluginData = async (plugin: ApiPlugin) => {
	// check if plugin is valid
	if (!plugin.id || typeof plugin.id !== "string") {
		throw new Error("Invalid plugin ID provided");
	}

	// fetch package data from npm registry
	const response = await fetch(`${Endpoints.fetchNpmPlugins}/${encodeURIComponent(plugin.id)}`);
  const pluginData = await response.json();

	return {
		id: plugin.id,
    imageUrl: plugin.imageUrl,
    createdAt: plugin.createdAt,
    updatedAt: plugin.updatedAt,
    userId: plugin.userId,
    packageUrl: plugin.packageUrl,
		name: pluginData.name,
		version: pluginData.latest,
		authorName: pluginData.author.name,
		authorImg: pluginData.author.name,
		description: pluginData.description,
		favoritesCount: plugin.favoritesCount,
    isFavorite: plugin.isFavorite ?? false,
		github: pluginData.repository,
    keywords: pluginData.keywords,
	}
}

export { getNpmPluginData }
