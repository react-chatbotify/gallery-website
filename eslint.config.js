import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';

export default [
	{
		// Ignore patterns (replaces .eslintignore)
		ignores: ["node_modules/**", "dist/**"],
	},
	{
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: typescriptParser,
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "react": reactPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "sort-keys-fix": sortKeysFixPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
  
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  
      // React hooks rules
      "react-hooks/rules-of-hooks": "error",
  
      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sort-keys-fix/sort-keys-fix": "warn",
    },
    settings: {
      react: {
        version: "detect",
        runtime: "automatic",
      },
    },
  },
];