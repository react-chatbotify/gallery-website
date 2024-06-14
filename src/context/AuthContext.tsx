import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserData {
  avatar_url: string;
  name: string;
  email: string;

  // todo: backend update with actual user id, not github user id
  id: string;

  // todo: backend replace with github_handle instead of login (default from github)
  login: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Initialize is_logged_in with the value from local storage or false if it doesn't exist
    const storedIsLoggedIn = localStorage.getItem('is_logged_in');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Initialize userData with the value from local storage or false if it doesn't exist
    const storedUserData = localStorage.getItem('user_data');
    return storedUserData ? JSON.parse(storedUserData) : false;
  });

  // Save isLoggedIn to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
