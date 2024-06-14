import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginProcessPage = () => {
  const { setUserData, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUserDataCalled = useRef(false);

  useEffect(() => {
    if (fetchUserDataCalled.current) {
      return;
    }

    console.log('COMONONON');
    const queryParams = new URLSearchParams(location.search);
    const uuid = queryParams.get('uuid');
    const provider = queryParams.get('provider');
    const fetchUserData = async () => {
      // todo: abstract into a constants file
      const url = `https://rcb-gallery-api.tjtanjin.com/api/v1/auth/login/process?provider=${provider}&uuid=${uuid}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      setUserData(await response.json());
      setIsLoggedIn(true);

      const redirectUri = localStorage.getItem('login_redirect_uri');
      if (redirectUri) {
        window.location.href = redirectUri;
      } else {
        navigate('/themes');
      }
    };
    fetchUserData();
    fetchUserDataCalled.current = true;
  }, []);

  // todo: render a loading spinner in the middle of the screen
  return null;
};

export default LoginProcessPage;
