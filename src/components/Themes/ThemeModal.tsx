import React, { useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { downloadThemeContent } from '../../utils';
import { Theme } from '../../interfaces/Theme';

type ThemeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
};

/**
 * Modal to popup for showing theme details.
 */
const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, theme }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {t} = useTranslation();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
        !modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const onDownload = () => {
		downloadThemeContent(
			theme.content.settings,
			theme.content.inlineStyles,
			theme.content.cssStyles,
			theme.name
		);
	};

	const modalContent = (
		<div
			className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50
        flex items-center justify-center pointer-events-auto"
		>
			<div
				ref={modalRef}
				className="relative bg-white p-6 rounded-lg shadow-lg max-w-screen-lg w-full m-4"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-5 text-gray-500 text-2xl"
				>
					&times;
				</button>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
					<div className="flex flex-col items-center">
						<img
							src={theme.themeImg}
							alt={theme.name}
							className="h-[400px] rounded-lg"
						/>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="font-semibold">Name:</div>
								<div>{theme.name}</div>
								<div className="font-semibold">Description:</div>
								<div>{theme.description}</div>
								<div className="font-semibold">ID:</div>
								<div>{theme.id}</div>
								<div className="font-semibold">Version:</div>
								<div>{theme.version}</div>
								<div className="font-semibold">Author:</div>
								<div className="flex items-center space-x-2">
									{theme.authorImg && (
										<img
											src={theme.authorImg}
											alt={theme.authorName}
											className="w-8 h-8 rounded-full"
										/>
									)}
									<div>
										<a
											href={`https://github.com/${theme.github}`}
											className="text-blue-500 underline"
										>
											{theme.authorName}
										</a>
									</div>
								</div>
								<div className="font-semibold">Tags:</div>
								<div className="flex flex-wrap gap-2">
									{theme.tags.map((tag, index) => (
										<span
											key={`tag-${index.toString()}`}
											className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
										>
											{tag}
										</span>
									))}
								</div>
								<div className="font-semibold">Contents:</div>
								<button
									type="button"
									onClick={() => onDownload()}
									className="theme-card-download"
								>
									Download
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return ReactDOM.createPortal(
		modalContent,
		document.getElementById('modal-container') || document.body
	);
};

export default ThemeModal;
