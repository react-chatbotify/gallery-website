import EmptySVG from "./emptySVG";
import { useState } from "react";
import { config } from "../../configs/profileconfig";
import {  ItemsIterator, PropTypes } from "../../interfaces/profile";





export default function ProfileMaterialContainer(Props: PropTypes) {
	const { type, items, loading } = Props
	let MainContent : any = EmptyMaterialPLaceholder
	if (loading) {
		MainContent = LoadingPlaceholder
	} else if (items.length > 0) {
		MainContent = ItemsHandler
	}

	const mode = useState(1)[0] //I had to make it like this temporarily, fixing soon



	return (
		<div className="rounded-xl w-[95vw] grid gap-8 text-primary-white self-center my-5 
    p-10 bg-primary-darkForeground">
			<div className="">
				<h2 className="font-extrabold float-left text-xl ">{config[type].mainHeading}</h2>
				{/* <div className="float-right">toggle here</div> */}
			</div>
			<MainContent {...Props} mode={mode} config={config[type]} />
			{     !loading && items.length > 0 && <a href={config[type].allUrl} 
				className="underline justify-self-center cursor-pointer  text-primary-mutedForeground">see all</a>
			}    </div>
	)
}


const EmptyMaterialPLaceholder = ({ mode, config, }: { type: string, mode: number, config: any }) => {
	return (

		<div className="w-fit grid gap-9 p-3 justify-items-center items-center justify-self-center self-center">
			<EmptySVG />
			<div className="gap-2 grid justify-items-center">
				<h1 className="font-extrabold">{config.emptyState.subHeading[mode]}</h1>
				<p className="text-primary-mutedForeground">{config.emptyState.subText}</p>
			</div>
			<div className="grid grid-flow-col gap-3">
				<button className="bg-slate-400">
					{config.emptyState.buttons.secondary}
				</button>
				<button className="bg-slate-400">
					{config.emptyState.buttons.primary}
				</button>
			</div>
		</div>
	)
}

const LoadingPlaceholder = () => ('loading...')


const ItemsHandler: React.FC<ItemsIterator> = ({ items, mode, config }) => {
	const ItemCard = config.elements.ItemCard
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
			{
				items.map((item : any) => (
					<ItemCard {...item} mode={mode} />
				))
			}
		</div>
	)
}