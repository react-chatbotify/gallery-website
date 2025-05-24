// themes data fetched from backend api
export type ApiTheme = {
  id: string;
  name: string;
  description: string;
  favoritesCount: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
};
