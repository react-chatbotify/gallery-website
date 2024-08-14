/* eslint-disable max-len */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoginUser from '../hooks/useFetchUserData';
import { useAuth } from '../context/AuthContext';
import { Endpoints } from '../constants/Endpoints';
// import Spinner from '../components/Spinner/Spinner';
// import Spinner2 from '../components/Spinner2/Spinner2';
// import Spinner3 from '../components/Spinner3/Spinner3';
import Spinner3 from '../components/Spinner4/Spinner4';
const LoginProcessPage = () => {
	const { setUserData, setIsLoggedIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const key = queryParams.get('key') as string;
	const provider = queryParams.get('provider') as string;
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
	// Apply black background during loading
	return (
		<div className="h-screen w-full bg-black flex justify-center items-center">
			{loading && <Spinner3 />}
			{error && <div className="text-white">Error: {error.message}</div>}
		</div>
	);
};
export default LoginProcessPage;