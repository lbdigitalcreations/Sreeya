/**
 * Resolves static asset paths taking into account Vite's BASE_URL (e.g., GitHub Pages subpaths like /Sreeya/)
 * @param {string} path - Asset path, e.g. '/1.jpeg', '1.jpeg', or 'https://...'
 * @returns {string} - Properly prefixed asset URL
 */
export const getAssetUrl = (path) => {
  if (!path) return '';

  // If already an external URL, data URI, or blob URL, return as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';

  // If path already starts with baseUrl (e.g. '/Sreeya/1.jpeg'), don't duplicate
  if (baseUrl !== '/' && path.startsWith(baseUrl)) {
    return path;
  }

  // Strip leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
};
