import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function PluginSearchBar() {
	const [searchParams, setSearchParams] = useSearchParams()
	const searchQuery = searchParams.get('searchQuery') || "";
	const setSearchQuery = (input: string) => {
		if(input == ""){
			searchParams.delete("searchQuery")
			setSearchParams(searchParams)
		} else {
			searchParams.set("searchQuery",input)
			setSearchParams(searchParams)
		}
	}
	return <div>
		<div  className='bg-slate-900 border focus-within:ring-2 focus-within:ring-slate-300 border-slate-300 flex rounded-md gap-2 px-3 py-2 max-w-[500px] w-full'>
			<Search className='text-slate-300 w-4' />
			<input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}  placeholder='Search plugins...' className='bg-transparent focus:border-0  focus:outline-none focus:ring-0 placeholder:text-sm text-slate-300 rounded-md w-full' />
		</div>
	</div>
}