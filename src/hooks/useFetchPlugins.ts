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
    useEffect(function() {
      // avoid race conditions
      const controller = new AbortController()
      let isAbort = false

      setIsLoading(true)
      setError("")
      setPlugins([])

      fetchPlugins(controller, url, searchQuery)

      .then((plugins)=> {
        setPlugins(plugins)
        setError("")
      })

      .catch((err: Error) => {
       if(err.name != 'AbortError') { 
          setError(err.message);
      }
        else {
          isAbort = true
        }
      })

      .finally(() => {
        if(!isAbort) setIsLoading(false)
      })

      return () => controller.abort()
    },[searchQuery, url, pageNum, pageSize])



    return {plugins, isLoading, error }
}

const fetchPlugins = async(controller: AbortController, url: string, searchQuery?: string) => {
  try{
    if(searchQuery){
     url += `?searchQuery=${searchQuery}`
    }
    const data = await galleryApiFetch(url,{
      signal: controller.signal
    });
    const plugins = await data.json()
    return plugins.data
  } catch(e: unknown){
    if((e as Error).name != 'AbortError')
    throw new Error("Problem fetching plugins!")
    else throw e
  }
}


export default useFetchPlugins