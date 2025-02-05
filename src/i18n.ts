import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: "en", // Initial language
		fallbackLng: "en", // Fallback language
		debug: true, // Enable debug mode
		ns: [], // Leave empty as namespaces will be dynamically loaded
		interpolation: {
			escapeValue: false, // React already escapes values
		},
		backend: {
			// Path to your translation JSON files
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
		react: {
			useSuspense: true, // Enable suspense for lazy loading
		},
	});

export default i18n;
