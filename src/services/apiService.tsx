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

export {
  galleryApiFetch
}