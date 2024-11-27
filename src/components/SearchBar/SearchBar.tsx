import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
	onSearch: (query: string) => void;
}

/**
 * Searchbar for users to input their search query.
 */
const SearchBar: React.FC<Props> = ({ onSearch }) => {
	// tracks current user search query
	const [searchParams] = useSearchParams()
	// initialize both query and previous query with searchParam if exists
	const [query, setQuery] = useState(() => searchParams.get('searchQuery') || "");
	const [previousQuery, setPreviousQuery] = useState(() => searchParams.get('searchQuery') || "");

	// Handles the input change and sets the query state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setQuery(value);
	}

	// Handles the key down event and triggers search on Enter key press
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// only search on enter key and if query changed
		if (e.key === 'Enter' && query !== previousQuery) {
			onSearch(query);
			setPreviousQuery(query);
		}
	}

	return (
		<div className="mb-8">
			<input
				type="text"
				placeholder="Search themes..."
				value={query}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				className="border rounded-md px-2 py-1 w-3/4 bg-accent-800 text-xs"
        
			/>
		</div>
	)
}

export default SearchBar;
