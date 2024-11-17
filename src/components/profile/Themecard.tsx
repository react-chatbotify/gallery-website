import { Link } from "react-router-dom"
import { GenericItemCardProps } from "../../interfaces/profile"

export const ThemeCard: React.FC<GenericItemCardProps> = ({ themeImg, id, name, description }) => {
	return (
		<div className="flex gap-3 w-full h-fit flex-row">
			<img className="w-20 rounded-lg" src={themeImg} />
			<div className="flex flex-col w-full relative gap-3">
				<h1 className="font-extrabold text-xl">{name}</h1>
				<p className="text-primary-mutedForeground text-sm block ">{description}</p>
				<div className="flex absolute  bottom-0 bg-primary-darkForeground flex-row gap-2">
          <Link className=" cursor-pointer font-extrabold text-sm text-blue-500"  to={"/themes?theme="+encodeURIComponent(id)} >View Theme</Link>
					{/* {mode == 1 && <a className="cursor-pointer text-sm text-red-500">Remove favourite</a>} */}
				</div>
			</div>
		</div>
	)
}