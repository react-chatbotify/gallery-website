import React, { useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ChatBot, { Params } from 'react-chatbotify';

import ThemeCard from '../components/Themes/ThemeCard';
import SearchBar from '../components/SearchBar/SearchBar';
import useFetchData from '../hooks/useFetchThemes';
import { Theme } from '../interfaces/Theme';
import { Endpoints } from '../constants/Endpoints';
import { useSearchParams } from 'react-router-dom';

/**
 * Displays themes for users to search, browse and rate.
 * // todo: dynamically load themes as user scrolls instead of fetching wholesale from backend
 */
const Themes: React.FC = () => {
  //search param hook to access URL
  const [searchParams, setSearchParams] = useSearchParams()

	// search query for filtering themes to show
	const [searchQuery, setSearchQuery] = useState(()=> searchParams.get('searchQuery') || "");

	// id of themes being selected to be preview (and applied to the interactive chatbot)
	const [previewIds, setPreviewIds] = useState<string[]>([]);

	// theme data fetched from backend

	const { themes, loading, error } = useFetchData(Endpoints.fetchApiThemes, 30, 1, searchQuery);
	/**
	 * Handles setting of search query when user hits enter.
	 *
	 * @param query query user inputted
	 */
	const handleSearch = (query: string) => {
    if(query === ""){
      searchParams.delete('searchQuery')
    } 
    else {
      searchParams.set('searchQuery',query)
    }
    setSearchParams(searchParams)
		setSearchQuery(query);
	}

	/**
	 * Handles setting and unsetting of theme ids to preview.
	 *
	 * @param id id of theme to set or unset
	 */
	const onPreview = (id: string) => {
		setPreviewIds((prevPreviewId) =>
			prevPreviewId.includes(id)
				? prevPreviewId.filter((item) => item !== id)
				: [...prevPreviewId, id]
		)
	}

	/**
	 * Clears all preview ids.
	 */
	const clearPreviewIds = () => {
		setPreviewIds([])
	}

	// flow for interactive chatbot
	const flow = {
		start: {
			message: (params: Params) => {
				params.injectMessage("Hello 👋! Did you know? The order of specifying themes matters!")
				return "Try previewing some themes below, or click on those on the left! 😊"
			},
			checkboxes: {items: ["Minimal Midnight", "Cyborg", "Terminal"]},
			function: (params: Params) => {
				setPreviewIds(params.userInput.split(",").map(theme => {
					if (theme === "Minimal Midnight") {
						return "minimal_midnight"
					} else if (theme === "Cyborg") {
						return "cyborg"
					} else {
						return "terminal"
					}
				}))
			},
			chatDisabled: true,
			path: "end"
		},
		end: {
			message: "What's next? 😊",
			options: ["Try Again", "Check Documentation", "Discord"],
			path: (params: Params) => {
				if (params.userInput === "Try Again") {
					setPreviewIds([])
				} else if (params.userInput === "Discord") {
					window.open("https://discord.gg/6R4DK4G5Zh")
				} else if (params.userInput === "Check Documentation") {
					window.open("https://react-chatbotify.com")
				} else {
					setPreviewIds([])
					params.injectMessage("Hmmm I'm not sure what you said, but let's try again!")
				}
				return "start"
			}
		}
	}

	// todo: show a proper error message if themes are not able to be fetched
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="flex flex-col lg:flex-row h-screen relative">
			{/* Main content area */}
			<div className="order-1 md:order-0 lg:w-3/4 overflow-y-auto bg-gray-900 p-8 hide-scrollbar">
				<div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pb-8
						gap-6 justify-items-center w-full"
					style={{transform: "translateY(8vh)"}}
				>
					
					{loading
						? Array.from({ length: 9 }).map((_, index) => (
							<Skeleton key={`skeleton-${index}`} width="100%" containerClassName='w-full' height={400} />
						))
						: themes.map((theme: Theme) => (
							<ThemeCard
								key={theme.id}
								theme={theme}
								isPreviewed={previewIds.includes(theme.id)}
								onPreview={() => onPreview(theme.id)}
							/>
						))}
				</div>
			</div>

			{/* Pinned search column */}
			<div className="flex flex-col order-0 lg:order-1">
				<div className="bg-black w-full" style={{height: "9vh"}}></div>
				<div className="bg-white shadow-xl p-6 flex flex-col overflow-y-auto hide-scrollbar">
					<div className="mb-4">
						<SearchBar onSearch={handleSearch} />
					</div>
					<div className="lg:block hidden">
						<div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg p-4">
							<ChatBot
								flow={flow}
								themes={previewIds.map(themeId => ({ id: themeId }))}
								settings={{ general: { embedded: true } }}
								styles={{ chatWindowStyle: { height: '60vh', width: '20vw' } }}
							/>
							<button 
								onClick={clearPreviewIds} 
								className="text-white p-2 rounded-lg mt-5"
								style={{backgroundColor: "#491d8d"}}
							>
								Clear Previews
							</button>
						</div>
						<div className="flex flex-col justify-between items-center mb-4 mt-5 w-full">
							<div className="bg-gray-100 rounded-lg p-4 overflow-y-auto shadow-lg w-full max-w-md">
								<h2 className="text-center font-bold mb-4 text-lg text-gray-800">Preview Themes</h2>
								{previewIds.length > 0 ? (
									<ul className="divide-y divide-gray-300">
										{previewIds.map((id, index) => (
											<li
												key={index}
												className="p-3 flex items-center justify-between text-gray-700
													hover:bg-gray-200 rounded transition duration-150"
											>
												<span>{id}</span>
											</li>
										))}
									</ul>
								) : (
									<p className="text-center text-gray-500">No themes selected for preview</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal container */}
			<div id="modal-container" className="fixed inset-0 z-50 pointer-events-none">
				{/* ThemeModals will be rendered here by React's portal */}
			</div>
		</div>
	)
}

export default Themes