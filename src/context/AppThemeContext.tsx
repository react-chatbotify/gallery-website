import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AppThemeType = 'light' | 'dark';

type AppThemeContextType = {
  appTheme: 'light' | 'dark';
  toggleAppTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextType>({
  appTheme: 'dark',

  toggleAppTheme: () => {},
});

type AppThemeProviderProps = {
  children: ReactNode;
};

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  // defaults to dark theme
  const [appTheme, setAppTheme] = useState<AppThemeType>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('app-theme', appTheme);
  }, []);

  const toggleAppTheme = () => {
    setAppTheme((prevAppTheme) => {
      const isDarkTheme = prevAppTheme === 'dark';
      document.documentElement.setAttribute('app-theme', isDarkTheme ? 'light' : 'dark');
      return isDarkTheme ? 'light' : 'dark';
    });
  };

  return <AppThemeContext.Provider value={{ appTheme, toggleAppTheme }}>{children}</AppThemeContext.Provider>;
};

const useAppTheme = (): AppThemeContextType => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};

export { AppThemeProvider, useAppTheme };
