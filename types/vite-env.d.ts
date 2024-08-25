/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_APP_CLIENT_ID: string;
  readonly VITE_GALLERY_API_URL: string;
  readonly VITE_GITHUB_THEMES_CACHE_URL: string;
  readonly VITE_GITHUB_LOGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
