import { Dispatch, SetStateAction, useState } from "react";

import ChatBot, { Params } from "react-chatbotify";
import { formatPreviewIdToTitleCase } from "../../utils";
import { Trash } from "lucide-react";

type ThemePreviewProps = {
  previewIds: string[];
  setPreviewIds: Dispatch<SetStateAction<string[]>>;
};

const ThemePreview = ({ previewIds, setPreviewIds }: ThemePreviewProps) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleDrawerVisibility = () => {
		setIsVisible(!isVisible);
	};

	// flow for interactive chatbot
	const flow = {
		start: {
			message: (params: Params) => {
				params.injectMessage("Hello 👋! Did you know? The order of specifying themes matters!");
				return "Try previewing some themes below, or click on those on the left! 😊";
			},
			checkboxes: { items: ["Minimal Midnight", "Cyborg", "Terminal"] },
			function: (params: Params) => {
				setPreviewIds(
					params.userInput.split(",").map((theme) => {
						if (theme === "Minimal Midnight") {
							return "minimal_midnight";
						} else if (theme === "Cyborg") {
							return "cyborg";
						} else {
							return "terminal";
						}
					}),
				);
			},
			chatDisabled: true,
			path: "end",
		},
		end: {
			message: "What's next? 😊",
			options: ["Try Again", "Check Documentation", "Discord"],
			path: (params: Params) => {
				if (params.userInput === "Try Again") {
					setPreviewIds([]);
				} else if (params.userInput === "Discord") {
					window.open("https://discord.gg/6R4DK4G5Zh");
				} else if (params.userInput === "Check Documentation") {
					window.open("https://react-chatbotify.com");
				} else {
					setPreviewIds([]);
					params.injectMessage("Hmmm I'm not sure what you said, but let's try again!");
				}
				return "start";
			},
		},
	};

	const handleRemoveSelectionClick = (previewIdToRemove: string) => {
		const filteredPreviewIds = previewIds.filter((previewId) => previewId !== previewIdToRemove);
		setPreviewIds([...filteredPreviewIds]);
	};

	return isVisible ? (
		<div
			className={`h-[92vh] bg-accent-800 p-5 flex flex-col items-center 
    w-screen md:w-[45rem] absolute md:relative`}
		>
			<div className="text-accent-50  mb-4 md:mb-6 w-full md:mt-14">
				<h2 className="text-2xl font-semibold">Preview</h2>
				<h3 className="text-accent-400">{previewIds.length} theme(s) selected</h3>
			</div>
			{/* Close button which is hidden on desktop */}
			<button className="text-accent-50 top-3 right-5 absolute md:hidden" onClick={toggleDrawerVisibility}>
				Close
			</button>
			{/* Collapse button which is hidden on mobile */}
			<div className="hidden md:block absolute left-[-2rem]">
				<span
					className="bg-blue-500 text-accent-50 text-sm px-[8px] py-[3px]
        rounded-full absolute left-[-12px] top-[-10px]"
				>
					{previewIds.length}
				</span>
				<button
					onClick={toggleDrawerVisibility}
					className="text-accent-50
        text-lg bg-accent-700 py-2 px-3 rounded-lg"
				>
					Collapse {">>"}
				</button>
			</div>
			<ChatBot
				flow={flow}
				themes={previewIds.map((themeId) => ({ id: themeId }))}
				settings={{ general: { embedded: true } }}
				styles={{ chatWindowStyle: { height: "45vh" } }}
			/>
			<div className="w-full mt-8 max-h-[300px] overflow-y-auto">
				{previewIds.map((previewId) => {
					const previewTitle = formatPreviewIdToTitleCase(previewId);
					return (
						<div className="flex justify-between my-2">
							<span className="text-accent-50 font-semibold text-lg">{previewTitle}</span>
							<div className="text-blue-500 hover:text-blue-600 flex items-center">
								<button
									onClick={() => handleRemoveSelectionClick(previewId)}
									className="font-semibold mr-[3px]"
								>
									Remove Selection
								</button>
								<Trash size={15}/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex flex-col p-3 w-full items-center">
				<button
					className="bg-accent-700 text-accent-400 text-lg py-2 rounded-lg my-2
        w-[90%] hover:bg-accent-600 hover:text-accent-300"
				>
					Download theme bundle
				</button>
				<button
					className="bg-accent-300 text-accent-950 text-lg py-2 rounded-lg my-2
        w-[90%] hover:bg-accent-200"
				>
					Edit in theme builder
				</button>
			</div>
		</div>
	) : (
		<div className="absolute bottom-6 md:top-32 right-5">
			<span
				className="bg-blue-500 text-accent-50 text-sm px-[8px] py-[3px]
      rounded-full absolute left-[-12px] top-[-10px]"
			>
				{previewIds.length}
			</span>
			<button
				onClick={toggleDrawerVisibility}
				className="text-accent-50 text-lg
      bg-accent-700 py-2 px-3 rounded-lg"
			>
				Show Preview
			</button>
		</div>
	);
};

export default ThemePreview;
