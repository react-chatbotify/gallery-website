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

export {
	downloadThemeContent
}
