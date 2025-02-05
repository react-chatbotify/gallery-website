// themes data fetched from backend api
export interface ApiTheme {
  id: string;
  name: string;
  description: string;
  favoritesCount: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
}