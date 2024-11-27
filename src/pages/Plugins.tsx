import React from 'react';

import { Endpoints } from '../constants/Endpoints';
import useFetchPlugins from '../hooks/useFetchPlugins';

import Skeleton from 'react-loading-skeleton';
import { PluginCard } from '../components/Plugins/PluginCard';
import PluginSearchBar from '../components/Plugins/PluginSearchBar';
import { useSearchParams } from 'react-router-dom';
/**
 * Displays plugins for users to search, browse and rate.
 * // todo: dynamically load plugins as user scrolls instead of fetching wholesale from backend
 */
const Plugins: React.FC = () => {
	const [searchParams] = useSearchParams()
	const searchQuery = searchParams.get('searchQuery') || "";

	const { plugins, isLoading, error } = useFetchPlugins(Endpoints.fetchApiPlugins, 30, 1,searchQuery );
  
	return (
		<div className=" min-h-screen bg-black">
			<div className='p-8 flex flex-col gap-8 max-w-[1024px] m-auto'>
				<PluginSearchBar />
				<div className='grid xs:grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8'>
					{isLoading ? Array.from({length : 9}).map((_ , i)=><Skeleton key={i} width="280px" containerClassName='m-auto' height="300px" />) :
						plugins.length > 0 && plugins.map(plugin =>{
							return <PluginCard key={plugin.id} plugin={plugin} />
						})}
				</div>
        {!isLoading && error && <h1 className='text-white text-lg flex items-center justify-center '>{error}</h1>
	 }
				{
					!error && !isLoading && plugins.length == 0 &&
					<h1 className='text-white text-lg flex items-center justify-center '>No search results found...</h1>
				}
			</div>
		</div>
	);
};

export default Plugins;
