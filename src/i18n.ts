import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // Path to your translation JSON files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Fallback language
    debug: true,

    // Initial language
    fallbackLng: 'en',

    // Leave empty as namespaces will be dynamically loaded
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'RCBG_SELECTED_LANGUAGE',
    },
    // Enable debug mode
    ns: [],
    react: {
      useSuspense: true, // Enable suspense for lazy loading
    },
  });

export default i18n;
