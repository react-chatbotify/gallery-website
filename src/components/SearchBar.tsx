import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Search</h2>
      <input
        type="text"
        placeholder="Search themes..."
        value={query}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>
  );
};

export default SearchBar;
