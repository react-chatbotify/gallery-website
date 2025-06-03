import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Endpoints } from './constants/Endpoints';
import reportWebVitals from './reportWebVitals';

// on app load fetch a CSRF token and stash it in localStorage
(async () => {
  try {
    const resp = await fetch(Endpoints.fetchCsrfToken, {
      credentials: 'include',
    });
    if (!resp.ok) {
      console.error('Failed to fetch CSRF token:', await resp.text());
    } else {
      const { csrfToken } = await resp.json();
      // store it in localStorage
      localStorage.setItem('csrf_token', csrfToken);
    }
  } catch (e) {
    console.error('Error fetching CSRF token:', e);
  }
})();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
