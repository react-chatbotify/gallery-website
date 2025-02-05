import { Endpoints } from "../constants/Endpoints";

/**
 * Handles redirecting of user for login.
 *
 * @param redirect_uri uri to redirect user to after login
 */
const handleLogin = (redirect_uri?: string) => {

	// if no uri specified to redirect to after login, then fallback to current location
	let final_redirect_uri = redirect_uri as string;
	if (!redirect_uri) {
		final_redirect_uri = window.location.href;
	}

	// save redirect uri for later (post-login)
	localStorage.setItem('login_redirect_uri', final_redirect_uri);

	// oauth provider chosen (currently no parameter as github is the only one)
	const client_id = import.meta.env.VITE_GITHUB_APP_CLIENT_ID;

	// redirect user to login endpoint with client id
	window.location.href = `${Endpoints.gitHubLoginUrl}?client_id=${client_id}`;
}

export { handleLogin }
