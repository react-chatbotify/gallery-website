import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GlobalModal from './components/GlobalModal/GlobalModal';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { AuthProvider } from './context/AuthContext';
import { GlobalModalProvider } from './context/GlobalModalContext';
import { useNotify } from './hooks/useNotify';
import i18n from './i18n';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginProcessPage from './pages/LoginProcess';
import OurTeamPage from './pages/OurTeam';
import PluginsPage from './pages/Plugins';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sponsors from './pages/Sponsors';
import TermsOfService from './pages/TermsOfService';
import ThemesPage from './pages/Themes';
import UserProfilePage from './pages/UserProfile';
import ProtectedRoute from './routes/ProtectedRoute';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

const App: React.FC = () => {
  const notify = useNotify();

  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    const isLightMode = localStorage.getItem('theme');
    return isLightMode === 'light';
  });

  useEffect(() => {
    i18n.loadNamespaces('components/globalmodal');
  }, []);

  useEffect(() => {
    const message = localStorage.getItem('logoutMessage');
    if (message) {
      setTimeout(() => {
        notify(message);
      }, 500);
      localStorage.removeItem('logoutMessage');
    }
  }, [notify]);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      if (prev) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      return !prev;
    });
  };

  // Define Navbar wrapper
  const NavbarWrapper = () => (
    <div>
      <NavigationBar toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );

  // Define Routes inside App component
  const routes = [
    {
      element: <LoginProcessPage />,
      path: '/login/process',
    },
    {
      children: [
        { element: <HomePage />, path: '/' },
        { element: <PluginsPage />, path: '/plugins' },
        { element: <PrivacyPolicy />, path: '/privacy-policy' },
        { element: <ThemesPage />, path: '/themes' },
        { element: <Sponsors />, path: '/sponsors' },
        { element: <OurTeamPage />, path: '/our-team' },
        { element: <TermsOfService />, path: '/terms-of-service' },
        {
          element: <ProtectedRoute element={<UserProfilePage />} />,
          path: '/profile',
        },
      ],
      element: <NavbarWrapper />,
      errorElement: <ErrorPage />,
      path: '/',
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
            <GlobalModalProvider>
              <CssBaseline />
              <Suspense fallback={<div></div>}>
                <RouterProvider router={router} />
              </Suspense>
              <GlobalModal />
            </GlobalModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
      {/* Toast */}
      <ToastContainer />
    </>
  );
};

export default App;
