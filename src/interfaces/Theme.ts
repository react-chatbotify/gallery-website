// file contents belonging to a theme
interface ThemeContent {
  settings: string;
  inlineStyles: string;
  cssStyles: string;
}

// consolidated themes data fetched from both backend api and github
export interface Theme {
  id: string;
  name: string;
  description: string;
  version: string;
  themeImg: string;
  authorImg: string;
  authorName: string;
  favoritesCount: number;
  isFavorite: boolean;
  tags: string[];
  github: string;
  content: ThemeContent;
}
