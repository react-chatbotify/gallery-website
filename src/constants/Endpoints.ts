// endpoints for making requests
// todo: update url after domains are consolidated
const Endpoints = {
  favoritePlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/plugins/favorited`,
  favoriteThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/themes/favorited`,
  fetchApiPlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/plugins`,
  fetchApiThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/themes`,
  fetchCacheThemes: 'https://cdn.jsdelivr.net/gh/tjtanjin/react-chatbotify-themes/themes',
  fetchNpmPlugins: 'https://registry.npmjs.org',
  fetchProjectDetails: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/projects`,
  fetchUserOwnedPlugins: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/plugins`,
  fetchUserOwnedThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/themes`,
  fetchUserProfile: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/profile`,
  fetchCsrfToken: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/csrf-token`,
  galleryAuthRedirectUrl: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/callback`,
  gitHubCoreOrgUrl: 'https://github.com/React-ChatBotify',
  gitHubCoreOrgSponsorUrl: 'https://github.com/sponsors/React-ChatBotify',
  gitHubLoginUrl: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/github/login`,
  instagramCoreUrl: 'https://www.instagram.com/react.chatbotify',
  loginUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/login/process`,
  logoutUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/logout`,
  projectBaseUrl: `${import.meta.env.VITE_GALLERY_WEBSITE_URL}`,
  projectCoreDiscordUrl: 'https://discord.gg/6R4DK4G5Zh',
  projectCoreNpmUrl: 'https://www.npmjs.com/package/react-chatbotify',
  projectCoreRepoUrl: 'https://github.com/tjtanjin/react-chatbotify',
  projectPlaygroundUrl: `${import.meta.env.VITE_GALLERY_WEBSITE_URL}/playground`,
  projectQuickStartUrl: `${import.meta.env.VITE_GALLERY_WEBSITE_URL}/docs/introduction/quickstart`,
  projectLlmExampleUrl: `${import.meta.env.VITE_GALLERY_WEBSITE_URL}/docs/examples/llm_conversation`,
  twitterCoreUrl: 'https://x.com/reactchatbotify',
};

export { Endpoints };
