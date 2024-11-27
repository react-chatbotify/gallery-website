import React, { useEffect } from 'react';


import { useAuth } from '../context/AuthContext';
import { Endpoints } from '../constants/Endpoints';
import { galleryApiFetch } from '../services/apiService';
import {useTranslation} from 'react-i18next';
import ProfileInfo from '../components/profile/profileInfo';
import ProfileSettings from '../components/profile/profileSettings';
import ProfileMaterialContainer from '../components/profile/profileMaterialContainer';
import useFetchThemes from '../hooks/useFetchThemes';
import { profileDummy } from '../constants/dummyData';

/**
 * Displays user profile information, owned themes/plugins and favorited themes/plugins.
 */
const UserProfilePage: React.FC = () => {
	const { userData, setUserData } = useAuth()

	useEffect(() => {
		refreshUserData();
	}, []);

	const refreshUserData = async () => {
		try {

			const response = await galleryApiFetch(Endpoints.fetchUserProfile);
			if (response.ok) {
				const result = await response.json();
				setUserData(result.data);
			}
		} catch {
			// no update if error
			setUserData(profileDummy as any)
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {t} = useTranslation();
	const themeFetch = useFetchThemes(Endpoints.fetchApiThemes, 6, 1);
	console.log(themeFetch)
	return (
		<main className=" min-h-screen overflow-clip flex-nowrap bg-[#121212] text-white flex flex-col">
			<ProfileInfo userInfo={userData} />
			<ProfileSettings />
			<ProfileMaterialContainer type='themes' items={themeFetch.themes} {...themeFetch} />
		</main>
	)
}

export default UserProfilePage
