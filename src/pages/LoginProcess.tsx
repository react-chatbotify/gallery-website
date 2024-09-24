import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoginUser from '../hooks/useFetchUserData';
import { useAuth } from '../context/AuthContext';
import { Endpoints } from '../constants/Endpoints';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const LoginProcessPage = () => {
	const { setUserData, setIsLoggedIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Retrieve provider and key from query params to be used for getting user data
	const queryParams = new URLSearchParams(location.search);
	const key = queryParams.get('key') as string;
	const provider = queryParams.get('provider') as string;

	// Fetch user data
	const { data, loading, error } = useLoginUser(Endpoints.loginUser, provider, key);

	useEffect(() => {
		if (loading || error) {
			return;
		}
		if (data) {
			setUserData(data);
			setIsLoggedIn(true);
			const redirectUri = localStorage.getItem('login_redirect_uri');
			if (redirectUri) {
				window.location.href = redirectUri;
			} else {
				navigate('/themes');
			}
		}
	}, [loading, error, data]);
	return (
		<div className="h-screen w-full bg-black flex justify-center items-center">
			{loading && <LoadingSpinner />}
			{error && <div className="text-white">Error: {error.message}</div>}
		</div>
	);
};

export default LoginProcessPage;