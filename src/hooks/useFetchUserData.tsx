import { useEffect, useRef, useState } from "react";

import { UserData } from "../interfaces/UserData";
import { galleryApiFetch } from "../services/apiService";

/**
 * Logs a user in by calling the backend api.
 *
 * @param url url to fetch user data from
 * @param provider oauth login provider being used
 * @param key identifies the user uniquely
 */
const useLoginUser = (url: string, provider: string, key: string) => {
	const [data, setData] = useState<UserData>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const fetchInitiated = useRef<boolean>(false);

	useEffect(() => {
		// prevents duplicate fetching (todo: check is it due to strict mode?)
		if (fetchInitiated.current) {
			return;
		}

		const fetchData = async () => {
			try {
				const response = await galleryApiFetch(`${url}?provider=${provider}&key=${key}`);
				const result = await response.json();
				setData(result);
			} catch (err: unknown) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		fetchInitiated.current = true;
	}, [url, provider, key]);

	return { data, loading, error };
};

export default useLoginUser;