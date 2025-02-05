// user data fetched from github login
export interface UserData {
  id: string;
  role: string;
  name: string;
  email: string;
  handle: string;
  avatarUrl: string;
  status: string;
  location: string;
  profileUrl: string; // todo: is this needed?
  provider: string; // login provider (e.g. github)
  providerUserId: string; // user id given by provider that user logged in with (e.g. github)
  joinDate?: string;
}
