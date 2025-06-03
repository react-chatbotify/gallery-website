/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_GALLERY_API_URL: string;
  readonly VITE_GALLERY_WEBSITE_URL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
