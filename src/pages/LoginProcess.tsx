import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Endpoints } from '@/constants/Endpoints';
import { SiteConfig } from '@/constants/SiteConfig';
import { useAuth } from '@/context/AuthContext';
import { useGlobalModal } from '@/context/GlobalModalContext';
import useFetchUserData from '@/hooks/useFetchUserData';

/**
 * A placeholder page shown for processing when a user is has authenticated with auth provider (e.g. github)
 * and is now calling backend API for fetching remaining user data.
 */
const LoginProcessPage: React.FC = () => {
  const { setUserData, setIsLoggedIn } = useAuth();
  const { setPromptError } = useGlobalModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [graceTime, setGraceTime] = useState(false);

  // retrieve provider and key from query params to be used for getting user data
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get('key') as string;
  const provider = queryParams.get('provider') as string;

  // fetch user data
  const { data, loading, error } = useFetchUserData(Endpoints.loginUser, provider, key);

  useEffect(() => {
    if (loading || error) {
      return;
    }
    if (data) {
      setUserData(data);
      setIsLoggedIn(true);
      const redirectUri = localStorage.getItem('login_redirect_uri');
      if (graceTime) {
        // keep waiting until grace time ends
        return;
      }
      if (redirectUri) {
        window.location.href = redirectUri;
      } else {
        navigate('/themes');
      }
    }
  }, [loading, error, data, graceTime, setUserData, setIsLoggedIn, navigate]);

  useEffect(() => {
    if (loading) {
      setGraceTime(true);
      setTimeout(() => {
        // allow the spinner to be removed from render once the grace time elapses
        setGraceTime(false);
      }, SiteConfig.loginSpinnerGraceTime);
    }
  }, [loading]);

  if (error) {
    setPromptError('error_modal.fail_login');
    return;
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {(loading || graceTime) && <CircularProgress size={80} />}
    </Box>
  );
};

export default LoginProcessPage;
