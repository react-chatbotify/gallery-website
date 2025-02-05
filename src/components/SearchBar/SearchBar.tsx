import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

/**
 * Searchbar for users to input their search query.
 * 
 * @param onSearch handles logic for when user performs search
 */
const SearchBar: React.FC<{
  onSearch: (query: string) => void
}> = ({
  onSearch
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/searchbar");

  const [searchParams] = useSearchParams();

  // Initialize query and previousQuery from searchParams if available
  const [query, setQuery] = useState(() => searchParams.get('searchQuery') || '');
  const [previousQuery, setPreviousQuery] = useState(() => searchParams.get('searchQuery') || '');

  // Handles the input change and sets the query state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handles the key down event and triggers search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query !== previousQuery) {
      onSearch(query);
      setPreviousQuery(query);
    }
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder={t("searchbar.placeholder")}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.default', // Background based on theme
          },
          '& .MuiOutlinedInput-input': {
            fontSize: '0.875rem', // Equivalent to text-xs
          },
          width: {md: 400, sm: "100%"}
        }}
      />
    </Box>
  );
};

export default SearchBar;
