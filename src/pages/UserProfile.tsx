import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { CalendarDays, Github, LucideMapPin } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import botAvatar from '../assets/images/bot_avatar.png';
import { Endpoints } from '../constants/Endpoints';
import { galleryApiFetch } from '../services/apiService';

/**
 * Displays user profile information, owned themes/plugins and favorited themes/plugins.
 */
const UserProfilePage: React.FC = () => {
	const { userData, setUserData } = useAuth()

	useEffect(() => {
		refreshUserData();
	}, [])

	const refreshUserData = async () => {
		try {
			const response = await galleryApiFetch(Endpoints.fetchUserProfile);
			const result = await response.json();
			setUserData(result);
		} catch {
			// no update if error
		}
	}

	return (
		<main className="w-full h-screen bg-[#121212] text-white flex flex-col">
			<div
				className="flex-1 bg-[#1f1f1f] rounded-lg p-6 shadow-lg m-4"
				style={{ transform: 'translateY(8vh)' }}
			>
				<div className="flex items-center">
					<div className="rounded-full w-32 h-32 bg-gray-700 overflow-hidden mr-6">
						<img
							src={userData?.avatar_url || botAvatar}
							alt={userData?.name || 'Bot Avatar'}
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<h1 className="text-3xl font-bold">
							{userData?.name ? `${userData?.name}` : 'User Profile'}
						</h1>
						<p className="text-base">Status:</p>
						{userData?.status && <p className="text-base">{userData?.status}</p>}
					</div>
				</div>
				<div className="mt-6">
					<div className="flex items-center mb-4">
						<Github className="mr-2" />
						<Link to={userData?.profile_url as string} className="text-sm">
							{userData?.handle}
						</Link>
					</div>
					<div className="flex items-center mb-4">
						<LucideMapPin className="mr-2" />
						<p className="text-sm">{userData?.location}</p>
					</div>
					<div className="flex items-center">
						<CalendarDays className="mr-2" />
						<p className="text-sm">Joined January 2024</p>
					</div>
				</div>
			</div>

			<div className="flex-1 rounded-lg p-6 shadow-lg m-4 flex flex-col items-center justify-center h-full">
				<h2 className="text-2xl font-bold mb-4 text-gray-200">
					Theme Author Section
				</h2>
				<p className="text-lg text-gray-400 mb-4">Coming Soon</p>
				<p className="text-md text-gray-500 text-center">
					This section is still under construction. In the meantime, feel free
					to browse our available themes.
				</p>
				<Link
					to="/themes"
					className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 
					hover:bg-blue-600 transition duration-300"
				>
					Browse Themes
				</Link>
			</div>
		</main>
	)
}

export default UserProfilePage
