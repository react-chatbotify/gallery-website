import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import { handleLogin } from '../services/authService';
import { siteConfig } from '../config/site';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUserData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-2 px-6 flex justify-between items-center" style={{ height: '8vh' }}>
      <Link to="/" className="flex items-center">
        {' '}
        {/* Wrap logo and title with Link */}
        <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-lg font-bold">{siteConfig.siteName}</h1>
      </Link>

      <div className="relative">
        <button onClick={toggleMenu} className="block md:hidden">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg py-1 w-48 z-10">
            <ul className="px-2">
              <li className="my-1">
                <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">
                  About
                </Link>
              </li>
              <li className="my-1">
                <Link to="/themes" className="block px-4 py-2 hover:bg-gray-700">
                  Themes
                </Link>
              </li>
              <li className="my-1">
                <Link to="/terms-of-service" className="block px-4 py-2 hover:bg-gray-700">
                  Terms of Service
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="my-1">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                      Profile
                    </Link>
                  </li>
                  <li className="my-1">
                    <button className="block px-4 py-2 hover:bg-gray-700">Logout</button>
                  </li>
                </>
              ) : (
                <li className="my-1">
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <ul className="hidden md:flex pr-20">
        <li className="mr-8">
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
        </li>
        <li className="mr-8">
          <Link to="/themes" className="hover:text-blue-500">
            Themes
          </Link>
        </li>
        <li className="mr-8">
          <Link to="/terms-of-service" className="hover:text-blue-500">
            Terms of Service
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="mr-8">
              <Link to="/profile" className="hover:text-blue-500">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setUserData(null);
                  navigate('/');
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => handleLogin()} className="hover:text-blue-500">
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
