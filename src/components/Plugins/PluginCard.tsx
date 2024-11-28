import { ExternalLink } from "lucide-react";
import { Plugin } from "../../interfaces/Plugin";

type PluginCardProps = {
  plugin: Plugin;
}
export function PluginCard({ plugin }: PluginCardProps) {
	return <section className="border gap-4 flex flex-col max-w-[314px]  hover:scale-[1.01]   p-4 pt-6 m-auto w-full border-card-border rounded-md h-[300px]">
		<div className="flex-1 flex flex-col gap-4">
			<div>
				<div>
					<h1 className="text-white text-[22px] font-semibold">{plugin.name}</h1>
					{/* 
      // TODO: should add and fetch data about user using the userId or a github handle linked to it
    */}
				</div>
			</div>
			<div className="text-white text-sm">
				{plugin.description}
			</div>
			<div className="w-full max-w-[200px]">
				<img className="w-full"  src={plugin.imageURL} />
			</div>
		</div>
		<div className="flex justify-between gap-3 sm:gap-1  flex-col sm:flex-row">
			<button className="bg-slate-900 text-[12px] px-4 pt-[6px] pb-[7px] rounded-md text-white">
				Read more
			</button>
      
			<button className="bg-brand-purple text-[12px] flex justify-center items-center gap-1  px-4 pt-[6px] pb-[7px] rounded-md text-white"><span>
				View in NPM 
			</span>
				<ExternalLink className="w-4" /></button>
		</div>
    
	</section>
}