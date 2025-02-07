// endpoints for making requests
const Endpoints = {
  projectBaseUrl: "https://react-chatbotify.com",
  projectDiscordUrl: "https://discord.gg/6R4DK4G5Zh",
  projectNpmUrl: "https://www.npmjs.com/package/react-chatbotify",
  projectRepoUrl: "https://github.com/tjtanjin/react-chatbotify",
  galleryAuthRedirectUrl: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/callback`,
  fetchApiThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/themes`,
  fetchApiPlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/plugins`,
  fetchProjectDetails: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/projects`,
  fetchUserProfile: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/profile`,
  fetchUserOwnedThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/themes`,
  fetchUserOwnedPlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/plugins`,
  fetchCacheThemes: import.meta.env.VITE_GITHUB_THEMES_CACHE_URL,
  fetchNpmPlugins: `${import.meta.env.VITE_NPM_PLUGINS_URL}`,
  loginUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/login/process`,
  logoutUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/logout`,
  gitHubLoginUrl: "https://github.com/login/oauth/authorize",
  favoriteThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/themes/favorited`,
  favoritePlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/plugins/favorited`,
}

export {
  Endpoints
}

