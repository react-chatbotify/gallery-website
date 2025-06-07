import { galleryApiFetch } from '@/utils';

import { Endpoints } from '../constants/Endpoints';

/**
 * Handles redirecting of user for login.
 */
const handleLogin = async () => {
  // save current location as redirect uri for later (post-login)
  localStorage.setItem('login_redirect_uri', window.location.href);

  const resp = await galleryApiFetch(Endpoints.gitHubLoginUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (!resp.ok) {
    // todo: show error modal?
    console.error('Failed to get GitHub authorization URL', await resp.text());
    return;
  }

  const { authorizationUrl } = await resp.json();

  // redirect user to login endpoint
  window.location.href = authorizationUrl;
};

export { handleLogin };
