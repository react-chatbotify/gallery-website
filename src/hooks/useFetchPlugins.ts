import { useEffect, useState } from "react";
import { galleryApiFetch } from "../services/apiService";
import { Plugin } from "../interfaces/Plugin";

/**
 * Fetches plugins from the backend api.
 *
 * @param url url to fetch plugins from
 * @param pageSize number of plugins to fetch each page
 * @param pageNum page number to fetch for
 * @param searchQuery search query for filtering plugins
 */
function useFetchPlugins(
  url: string,
	pageSize: number,
	pageNum: number,
	searchQuery?: string
  ) {
    const [plugins, setPlugins] = useState<Plugin[]>([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState("");
    useEffect(function(){
      
      const fetchPlugins = async() => {
        try{
          setIsLoading(true)
          if(searchQuery){
           url += `?searchQuery=${searchQuery}`
          }
          console.log(url)
          const data = await galleryApiFetch(url);
          const plugins = await data.json()
          setPlugins(plugins.data);
        } catch(e){
          
        }
        finally{
          setIsLoading(false)
        }
      }

       fetchPlugins();

    },[searchQuery])



    return {plugins, isLoading, error }
}


export default useFetchPlugins