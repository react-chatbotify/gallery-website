import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import HeroSection from '../components/LandingPage/HeroSection';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import ImageHeroSection from '../components/LandingPage/ImageHeroSection';

import { useTranslation } from 'react-i18next';


/**
 * Greets user as they visit the home (landing) page.
 */
const HomePage = () => {
	// used to render different text if user is logged in
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isLoggedIn, userData } = useAuth()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {t} = useTranslation();

	// handles navigation
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const navigate = useNavigate()

	return (
		<div className="relative overflow-hidden h-screen bg-accent-50 w-full">
			<div className='absolute size-[60%] sm:size-[60%] md:size-[60%] bg-gradient-to-r from-secondary-900
      -rotate-[30deg] to-primary-600 rounded-full z-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]
      blur-[150px] sm:blur-[200px]'>
			</div>
			<div className='relative z-1'>
				<NavigationBar />
				<HeroSection />
				<ImageHeroSection />
			</div>

			
		</div>
	)
}

export default HomePage
