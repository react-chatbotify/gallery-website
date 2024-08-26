// user data fetched from github login
// todo: good to reduce the number of fields?
// might not need twitter_url for example
// todo: good to add comments for ambiguous fields
export interface UserData {
	id: string;
	role: string;
	name: string;
	email: string;
	handle: string;
	avatar_url: string;
	status: string;
	location: string;
	profile_url: string;
	provider: string;
	provider_user_id: string;
}
