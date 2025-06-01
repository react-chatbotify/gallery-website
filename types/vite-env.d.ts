/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_GITHUB_APP_CLIENT_ID: string;
  readonly VITE_GALLERY_API_URL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
