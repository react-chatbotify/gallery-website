import { Link, useParams } from 'react-router-dom';
import botAvatar from '../assets/images/bot_avatar.png';
import { CalendarDays, Github, Loader, LucideMapPin, Twitter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { GithubUserDetails, Theme } from '../interfaces/Theme';
import { getThemeData } from '../services/apiService';

interface Props {
  theme: Theme;
}

const UserProfilePage: React.FC = () => {
  const { userData } = useAuth();
  const Card: React.FC<Props> = ({ theme }) => {
    if (true) {
      return (
        <div className="bg-slate-50 text-black w-[300px] h-[535px] rounded">
          <img src={theme.themeImg} className="w-full h-[390px]" alt={theme.name} />

          <div className="p-2 flex flex-col justify-between h-[145px]">
            <div>
              <p className="text-[15px] opacity-80 mb-2">{theme.name}</p>
              <p className="text-[15px] opacity-80">{theme.description}</p>
            </div>

            <div className="flex justify-between">
              <h4 className="text-base font-medium mb-0">{theme.authorName}</h4>

              <Link to={`/profile/${theme.github}`}>{theme.github}</Link>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <main className="w-full h-screen mx-auto bg-black">
      <div className="relative sm:rounded p-3 h-56 bg-blue-600 flex flex-col justify-center items-center">
        <div className="rounded-full w-20 h-20 lg:w-36 lg:h-36 absolute -bottom-10 outline outline-black/90 left-10">
          {userData?.name !== '' ? (
            <img src={userData?.avatar_url} alt={userData?.name} className=" rounded-full" />
          ) : (
            <img src={botAvatar} alt={userData?.name} className=" rounded-full" />
          )}
        </div>

        <div className=" text-center text-slate-200">
          <p className="text-lg font-semibold sm:text-xl md:text-3xl">
            {userData?.name !== '' ? `${userData?.name}'S PROFILE` : `Theme Author Profile`}
          </p>
          {userData?.bio !== '' && <p className="text-xs sm:text-base md:text-base">{userData?.bio}</p>}
          <p className="text-xs sm:text-base md:text-base">React ChatBotify</p>
        </div>

        <div className=" absolute bottom-4 right-6 z-0 flex flex-row gap-2 sm:hidden">
          <Github width={18} hanging={18} className=" text-slate-300 " />
          <Twitter width={18} hanging={18} className=" text-slate-300 " />
        </div>
      </div>

      <div className="relative h-fit p-4 px-6 text-white">
        <div className="pt-7">
          <p className="text-xl font-semibold">{userData?.name}</p>
          <Link to={userData?.html_url} className="text-sm opacity-80 flex gap-1 items-center w-fit">
            <Github width={15} hanging={15} />
            {userData?.login}
          </Link>
          {userData?.twitter_username !== null && (
            <p className="text-sm opacity-80 flex gap-1 items-center w-fit">
              <Twitter width={15} hanging={15} />
              {userData?.twitter_username}
            </p>
          )}
          <p className="text-sm opacity-80 flex gap-1 items-center">
            {' '}
            <LucideMapPin width={15} hanging={15} />
            {userData?.location}
          </p>
        </div>

        <div className="absolute top-2 right-6 text-xs opacity-80">
          <p className="flex gap-1 items-center">
            {' '}
            <CalendarDays width={15} hanging={15} /> Joined January 2024
          </p>
          {/* <p className=' absolute top-2 right-2 text-xs opacity-80'>Member since: 20/04/24</p> */}
        </div>
      </div>

      {/* <div className="w-full bg-black p-4 flex flex-col justify-center gap-4 sm:flex-row">
			{userData?.name !== '' ? 
				<>
					{themes.map(theme => (
						<Card key={theme.id} theme={theme} />
					))}
				</> : 
				<p className='flex flex-row gap-4 text-slate-100'><Loader className=' animate-spin'/> Loading...</p>
			} 
		</div> */}
    </main>
  );
};

export default UserProfilePage;
