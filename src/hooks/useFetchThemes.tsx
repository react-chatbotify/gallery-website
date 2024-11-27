import { useEffect, useState } from "react";

import { ApiTheme } from "../interfaces/ApiTheme";
import { getGitHubThemeData } from "../services/themeService";
import { Theme } from "../interfaces/Theme";
import { Placeholders } from "../constants/Placeholders";
import { galleryApiFetch } from "../services/apiService";
import { Endpoints } from "@/constants/Endpoints";

/**
 * Fetches themes from the backend api.
 *
 * @param url url to fetch themes from
 * @param pageSize number of themes to fetch each page
 * @param pageNum page number to fetch for
 * @param searchQuery search query for filtering themes
 */
const useFetchThemes = (
	url: string,
	pageSize: number,
	pageNum: number,
	searchQuery?: string
) => {
	const [themes, setThemes] = useState<Theme[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setLoading(true);
		fetchThemesFromApi(url, pageSize, pageNum, searchQuery)

			.then(themes => {
				setThemes(themes)
			})

			.catch(reason => {
				setError(reason)
			})

			.finally(() => {
				setLoading(false)
			})

	}, [url, pageSize, pageNum, searchQuery]);

	return { themes, loading, error };
};

/**
 * Fetches themes information from github (or more accurately, jsdelivr cache).
 */
const fetchThemesFromGitHub = async (apiThemes: ApiTheme[]): Promise<Theme[]> => {
	// todo: good to cache themes already fetched to reduce calls to cdn
	return await Promise.all(apiThemes.map(apiTheme => getGitHubThemeData(apiTheme)));
}

export const fetchThemesFromApi = async (	
	url: string = Endpoints.fetchApiThemes,
	pageSize: number,
	pageNum: number,
	searchQuery?: string
) => {

	try {
		let apiThemes = null;


		if (url.startsWith("http")) {
			let finalUrl = `${url}?pageSize=${pageSize}&pageNum=${pageNum}`;
			if (searchQuery) {
				finalUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
			}

			// first fetch the list of themes as per the input parameters
			const response = await galleryApiFetch(finalUrl);
			const result = await response.json();
			apiThemes = result.data;

		} else {
			apiThemes = Placeholders.themes;
		}

		//now fetch the details of each theme
		if (apiThemes) {
			return fetchThemesFromGitHub(apiThemes);
		} else {
			throw new Error('couldnt fetch themes')
		}
	} catch (err: any) {
		throw new Error(err)
	} 


 
}

export default useFetchThemes;
