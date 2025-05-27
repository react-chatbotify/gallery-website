// plugin data fetched from both backend api
export type ApiPlugin = {
  id: string;
  name: string;
  description: string;
  favoritesCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  packageUrl: string;
  isFavorite?: boolean;
};
