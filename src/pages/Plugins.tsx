import React from "react";

import { Link } from "react-router-dom";

/**
 * Displays plugins for users to search, browse and rate.
 * // todo: dynamically load plugins as user scrolls instead of fetching wholesale from backend
 */
const Plugins: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-screen-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-8">
          Plugins are not ready. Please check back later!
        </p>
        <p className="text-md text-gray-500 mb-4">
          In the meantime, feel free to browse our available themes.
        </p>
        <Link
          to="/themes"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg
						hover:bg-blue-600 transition duration-300"
        >
          Browse Themes
        </Link>
      </div>
    </div>
  );
};

export default Plugins;
