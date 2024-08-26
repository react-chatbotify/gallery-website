// endpoints for making requests
const Endpoints = {
	fetchApiThemes: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/themes`,
	fetchUserProfile: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/users/profile`,
	fetchCacheThemes: import.meta.env.VITE_GITHUB_THEMES_CACHE_URL,
	loginUser: `${import.meta.env.VITE_GALLERY_API_URL}/api/v1/auth/login/process`,
	gitHubLoginUrl: "https://github.com/login/oauth/authorize"
}

export {
	Endpoints
}
