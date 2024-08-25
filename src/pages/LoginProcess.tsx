import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import useLoginUser from "../hooks/useFetchUserData";
import { useAuth } from "../context/AuthContext";
import { Endpoints } from "../constants/Endpoints";

/**
 * Temporary login process page shown as user is logging in.
 */
const LoginProcessPage = () => {
  // context for handling user data
  const { setUserData, setIsLoggedIn } = useAuth();

  // handles navigation
  const navigate = useNavigate();

  // used in retrieving query params
  const location = useLocation();

  // retrieve provider and key from query params to be used for getting user data
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get("key") as string;
  const provider = queryParams.get("provider") as string;

  // fetch user data
  const { data, loading, error } = useLoginUser(
    Endpoints.loginUser,
    provider,
    key,
  );

  useEffect(() => {
    if (loading || error) {
      return;
    }

    // if data is retrieved successfully, set user data and login state
    if (data) {
      setUserData(data);
      setIsLoggedIn(true);

      // if redirect uri is provided, then redirectu ser
      const redirectUri = localStorage.getItem("login_redirect_uri");
      if (redirectUri) {
        window.location.href = redirectUri;
      } else {
        // default to themes page if no redirect uri
        navigate("/themes");
      }
    }
  }, [loading, error, data]);

  // todo: improve loading display
  if (loading) {
    return <div>Loading...</div>;
  }

  // todo: redirect to error page
  if (error) {
    return <div>Error: {error.message}</div>;
  }
};

export default LoginProcessPage;
