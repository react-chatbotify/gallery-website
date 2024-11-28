// plugin data fetched from both backend api
export interface Plugin {
  id: string;
  name: string;
  description: string;
  favoritesCount: number;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}