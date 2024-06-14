import { Loader } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

type Theme = {
  themeName: string;
  themeDescription: string;
  displayUrl: string;
  themeAuthor: string;
};

const themeNames = [
  'cyborg',
  'midnight_black',
  'minimal_midnight',
  'retro',
  'solid_purple_haze',
  'terminal',
  'tranquil_teal',
];

const ThemeItem = ({ item }: { item: Theme }) => (
  <div className="bg-slate-50 dark:bg-slate-800 h-full rounded overflow-hidden">
    <div className="relative">
      <img src={item.displayUrl} className="w-full" alt={item.themeName} />
    </div>
    <div className="p-4">
      <Link to={`#`}>
        <p className="text-[15px] opacity-80 mb-2">{item.themeName}</p>
      </Link>
      <p className="text-[15px] opacity-80">{item.themeDescription}</p>
      <div className="flex justify-between mt-4 mb-2">
        <div className="flex items-center">
          <Link to={`/profile/${item.themeAuthor}`}>
            <h4 className="text-base font-medium mb-0">{item.themeAuthor}</h4>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

ThemeItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const fetchThemeData = async (item: string) => {
  const cdnUrl = 'https://cdn.jsdelivr.net/gh/tjtanjin/react-chatbotify-themes/themes';
  const displayFile = 'display.png';
  const metaFile = 'meta.json';
  const displayUrl = `${cdnUrl}/${item}/${displayFile}`;
  const metaUrl = `${cdnUrl}/${item}/${metaFile}`;
  const meta = await (await fetch(metaUrl)).json();

  return {
    themeName: meta.theme,
    displayUrl: displayUrl,
    themeAuthor: meta.author,
    themeDescription: meta.description,
  };
};

const fetchThemes = async (): Promise<Theme[]> => {
  return await Promise.all(themeNames.map(fetchThemeData));
};

const ThemeGallery = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const fetchAndSetThemes = useCallback(async () => {
    const themesArray = await fetchThemes();
    setThemes([...themesArray]);
  }, []);

  useEffect(() => {
    fetchAndSetThemes();
  }, [fetchAndSetThemes]);

  return (
    <section className="py-14 md:py-24 bg-[#42b0c5] dark:bg-black text-zinc-900 dark:text-white h-screen">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl text-white md:text-[45px] font-bold mb-2">Themes</h1>
        </div>
        <div>
          <div className="grid grid-cols-12 gap-6 mt-6">
            {themes.length === 0 ? (
              <p className="col-span-12 flex justify-center gap-4 items-center h-52">
                <Loader className=" animate-spin" />
                Loading...
              </p>
            ) : (
              themes.map((item, i) => (
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3" key={i}>
                  <ThemeItem item={item} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeGallery;
