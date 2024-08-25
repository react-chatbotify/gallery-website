import React, { useState } from "react";

import { Link } from "react-router-dom";

import ThemeModal from "./ThemeModal";
import { Theme } from "../../interfaces/Theme";
import FavIcon from "../../assets/images/icon_favorite.svg";
import GitHubIcon from "../../assets/images/icon_github_white.svg";

import "../../styles/theme_card.css";

type Props = {
  theme: Theme;
  isPreviewed: boolean;
  onPreview: (name: string) => void;
};

/**
 * Theme card component to hold the details of each theme in the themes page.
 */
const ThemeCard: React.FC<Props> = ({ theme, isPreviewed, onPreview }) => {
  const [isFav, setIsFav] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const onViewDetails = () => {
    setViewDetails(true);
  };

  const onClickPreview = () => {
    onPreview(theme.name);
  };

  return (
    <>
      <div className="text-black w-[300px] h-[545px]">
        <button
          onClick={onViewDetails}
          type="button"
          className="relative group"
        >
          <img
            src={theme.themeImg}
            className="cursor-pointer w-full h-[400px] scale-80
              group-hover:-translate-y-6 transition ease-in-out duration"
            alt={theme.name}
          />
          <div className="theme-card-details">View Details</div>
        </button>
        <div className="theme-card-info">
          <div>
            <div className="flex justify-between">
              <p className="theme-card-title">{theme.name}</p>
              <button
                type="button"
                aria-label="Favorite Button"
                className={`theme-card-fav ${isFav && "active"}`}
                onClick={() => setIsFav((fav) => !fav)}
              >
                <img src={FavIcon} alt="fav-icon" />
              </button>
            </div>
            <p className="text-[15px] opacity-80">{theme.description}</p>
          </div>
          <Link to={`/profile/${theme.github}`} className="theme-card-github">
            <img src={GitHubIcon} alt="github-icon" />
          </Link>
          <div className="flex justify-between">
            <h4 className="theme-card-author">{theme.authorName}</h4>
            <button
              className={`theme-card-preview ${isPreviewed ? "active" : ""}`}
              type="button"
              onClick={onClickPreview}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <ThemeModal
        isOpen={viewDetails}
        theme={theme}
        onClose={() => setViewDetails(false)}
      />
    </>
  );
};

export default ThemeCard;
