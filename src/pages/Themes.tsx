import React, { useCallback, useState, useEffect } from 'react';
import ThemeCard from '../components/ThemeCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import { getThemeData } from '../services/apiService';
import { Theme } from '../interfaces/Theme';

const Themes: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const fetchAndSetThemes = useCallback(async () => {
    const themesArray = await fetchThemes();
    setThemes([...themesArray]);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = themes.filter(
      (theme) =>
        theme.name.toLowerCase().includes(query.toLowerCase()) ||
        theme.description.toLowerCase().includes(query.toLowerCase()),
    );
    setThemes(filtered);
  };

  // todo: backend add an api endpoint for getting list of theme names
  const themeNames = [
    'cyborg',
    'midnight_black',
    'minimal_midnight',
    'retro',
    'solid_purple_haze',
    'terminal',
    'tranquil_teal',
  ];
  const fetchThemes = async (): Promise<Theme[]> => {
    return await Promise.all(themeNames.map(getThemeData));
  };

  useEffect(() => {
    fetchAndSetThemes();
  }, [fetchAndSetThemes]);

  return (
    <div className="flex">
      <div className="w-3/4 p-8">
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </div>
      <div className="w-1/4 p-8">
        <Filters />
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Themes;
