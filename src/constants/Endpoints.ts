// endpoints for making requests
// todo: update url after domains are consolidated
const Endpoints = {
  favoritePlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/plugins/favorited`,
  favoriteThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/themes/favorited`,
  fetchApiPlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/plugins`,
  fetchApiThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/themes`,
  fetchCacheThemes: import.meta.env.VITE_GITHUB_THEMES_CACHE_URL,
  fetchNpmPlugins: `${import.meta.env.VITE_NPM_PLUGINS_URL}`,
  fetchProjectDetails: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/projects`,
  fetchUserOwnedPlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/plugins`,
  fetchUserOwnedThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/themes`,
  fetchUserProfile: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/profile`,
  galleryAuthRedirectUrl: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/callback`,
  gitHubCoreOrgUrl: 'https://github.com/React-ChatBotify',
  gitHubLoginUrl: 'https://github.com/login/oauth/authorize',
  instagramCoreUrl: 'https://www.instagram.com/react.chatbotify',
  loginUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/login/process`,
  logoutUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/logout`,
  projectBaseUrl: 'https://react-chatbotify.com',
  projectCoreDiscordUrl: 'https://discord.gg/6R4DK4G5Zh',
  projectCoreNpmUrl: 'https://www.npmjs.com/package/react-chatbotify',
  projectCoreRepoUrl: 'https://github.com/tjtanjin/react-chatbotify',
  projectPlaygroundUrl: 'https://react-chatbotify.com/playground',
  projectQuickStartUrl: 'https://react-chatbotify.com/docs/introduction/quickstart',
  twitterCoreUrl: 'https://x.com/reactchatbotify',
};

export { Endpoints };
