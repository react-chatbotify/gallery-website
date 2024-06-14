import React from 'react';
import { Theme } from '../interfaces/Theme';
import { Link } from 'react-router-dom';

interface Props {
  theme: Theme;
}

const ThemeCard: React.FC<Props> = ({ theme }) => {
  return (
    <div className="bg-slate-50 text-black w-[300px] h-[545px] rounded">
      <img src={theme.themeImg} className="w-full h-[400px]" alt={theme.name} />

      <div className="p-2 flex flex-col justify-between h-[145px]">
        <div>
          <p className="text-[15px] opacity-80 mb-2">{theme.name}</p>
          <p className="text-[15px] opacity-80">{theme.description}</p>
        </div>

        <div className="flex justify-between">
          <h4 className="text-base font-medium mb-0">{theme.authorName}</h4>

          <Link to={`/profile/${theme.github}`} className=" text-blue-500 visited:text-purple-600">
            {theme.github}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;
