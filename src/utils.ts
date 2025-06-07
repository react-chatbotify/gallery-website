import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const fetchFile = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.blob();
};

const downloadThemeContent = async (
  settingsUrl: string,
  inlineStylesUrl: string,
  cssStylesUrl: string,
  zipName: string
) => {
  const zip = new JSZip();

  // files to be downloaded
  const tasks = [
    { url: settingsUrl, filename: 'settings.json' },
    { url: inlineStylesUrl, filename: 'styles.json' },
    { url: cssStylesUrl, filename: 'styles.css' },
  ];

  // fetch in parallel
  const fetchPromises = tasks.map((task) => fetchFile(task.url));

  // wait for all fetches to complete
  const results = await Promise.allSettled(fetchPromises);

  let addedAny = false;
  results.forEach((res, idx) => {
    const { filename } = tasks[idx];

    if (res.status === 'fulfilled') {
      // add to zip if successful
      zip.file(filename, res.value);
      addedAny = true;
    } else {
      // log warning if a file cannot be fetched due to error
      console.warn(`Skipping "${filename}":`, (res.reason as Error).message);
    }
  });

  // if no files were fetched, nothing to download
  if (!addedAny) {
    console.error('No files were available to download. ZIP not created.');
    return;
  }

  // trigger download
  try {
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${zipName}.zip`);
  } catch (err) {
    console.error('Error generating ZIP:', (err as Error).message);
  }
};

// Function which takes preview ids formatted as 'word1_word2' and returns it formatted as 'Word1 Word2'
const formatPreviewIdToTitleCase = (input: string): string => {
  return input
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Reads the CSRF token out of the XSRF-TOKEN cookie.
 */
const getCsrfTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Wraps around the window fetch function to always include credentials and csrf token.
 *
 * @param url url to call
 * @param options additional options passed to fetch
 */
const galleryApiFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  // build headers object
  const headers = new Headers(options.headers || {});

  // grab the latest token from the cookie
  const csrfToken = getCsrfTokenFromCookie();
  if (csrfToken) {
    headers.set('X-CSRF-Token', csrfToken);
  }

  // perform initial fetch with credentials included
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });
  return response;
};

const getConstructedUrl = (url: string, params: Record<string, any>): string => {
  const queryParams = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null) // Remove undefined or null values
      .map(([key, value]) => [key, String(value)]) // Ensure all values are strings
  );

  return `${url}?${queryParams.toString()}`;
};

export { downloadThemeContent, formatPreviewIdToTitleCase, galleryApiFetch, getConstructedUrl };
