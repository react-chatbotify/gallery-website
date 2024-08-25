// themes data fetched from backend api
export interface ApiTheme {
  id: string;
  name: string;
  description: string;
  favorites_count: number;
  created_at: Date;
  updated_at: Date;
}
