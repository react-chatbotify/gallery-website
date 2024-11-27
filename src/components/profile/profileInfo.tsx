import { UserData } from '../../interfaces/UserData'


export default function ProfileInfo ({userInfo} : {userInfo: UserData | null}  ) {
	return (
		<div className="rounded-xl w-[95vw] grid gap-8
     text-primary-mutedForeground self-center my-5 p-10 bg-primary-darkForeground ">
			<h2 className="font-extrabold text-xl text-primary-white">Profile information</h2>
			<ProfileCard {...userInfo} />
			<OtherInfo {...userInfo} />
		</div>
	)

}

const ProfileCard: React.FC<UserData | any> = ({name, handle, avatarUrl, status}) => {
	return(
		<div className="grid gap-5 justify-start  self-center">
			<div className="grid p-1 w-fit grid-flow-col gap-3 h-fit">
				<img className="w-11 rounded-3xl h-11" src={avatarUrl}></img>
				<div >
					<h3 className="font-extrabold">{name}</h3>
					<p>{handle}</p>
				</div>
			</div>
			<p className="text-sm">{status}</p>
		</div>
	)
}

const OtherInfo: React.FC<UserData | any> = ({joindate, location, role}) => {
	return (
		<div className="flex flex-row  gap-8">
			<div className="grid text-sm items-start gap-1">
				<h5 className={`font-extrabold ${!location ? 'text-primary-disabledForeground' : ''}`}>
					Location
				</h5>
				<h5>{location}</h5>
			</div>
			<div className="grid text-sm items-start gap-1">
				<h5 className={`font-extrabold ${!joindate ? 'text-primary-disabledForeground' : ''}`}>
					Joined React Chatbotify
				</h5>
				<h5>{joindate}</h5>
			</div>
			<div className="grid text-sm items-start gap-1">
				<h5 className={`font-extrabold ${!role ? 'text-primary-disabledForeground' : ''}`}>
					Community role
				</h5>
				<h5>{role}</h5>
			</div>
		</div>
	)
}