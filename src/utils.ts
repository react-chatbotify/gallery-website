import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const fetchFile = async (url: string) => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}`)
	}
	return response.blob()
}

const downloadThemeContent = async (
	settingsUrl: string,
	inlineStylesUrl: string,
	cssStylesUrl: string,
	zipName: string
) => {
	const zip = new JSZip()
	try {
		const settings = await fetchFile(settingsUrl)
		const inlineStyles = await fetchFile(inlineStylesUrl)
		const cssStyles = await fetchFile(cssStylesUrl)

		zip.file('settings.json', settings)
		zip.file('styles.json', inlineStyles)
		zip.file('styles.css', cssStyles)

		const content = await zip.generateAsync({ type: 'blob' })
		saveAs(content, `${zipName}.zip`)
	} catch (error) {
		console.error('Error downloading files:', error)
	}
}

// Function which takes preview ids formatted as 'word1_word2' and returns it formatted as 'Word1 Word2'
const formatPreviewIdToTitleCase = (input: string): string => {
  return input
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Wraps around the window fetch function to always include credentials.
 *
 * @param url url to call
 * @param options additional options passed to fetch
 */
const galleryApiFetch = (url: string, options = {}) => {
	return fetch(url, {
		...options,
		credentials: 'include',
	});
}

const getConstructedUrl = (url: string, params: Record<string, any>): string => {
  const queryParams = new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null) // Remove undefined or null values
      .map(([key, value]) => [key, String(value)]) // Ensure all values are strings
  );

  return `${url}?${queryParams.toString()}`;
};

export {
	downloadThemeContent,
  formatPreviewIdToTitleCase,
  galleryApiFetch,
  getConstructedUrl,
}
