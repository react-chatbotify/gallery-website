// plugin data fetched from both backend api
export type Plugin = {
  id: string;
  name: string;
  description: string;
  favoritesCount: number;
  isFavorite: boolean;
  version: string;
  imageUrl: string;
  authorImg: string;
  authorName: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  github: string;
  packageUrl: string;
};
