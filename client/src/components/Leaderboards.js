import React, { useEffect } from "react";

import LeaderboardsTable from "./LeaderboardsTable";

import useAxios, { configure } from "axios-hooks";
import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";

import { URL } from "../utils";

function Leaderboards({avatars}) {
	configure({ axios: axiosInterceptorInstance });

	const [{ data, loading, error }, refetch] = useAxios({
		method: "GET",
		url: `${URL}/leaderboards`,
		headers: { "Content-Type": "application/json" },
	});

	useEffect(() => {
		refetch();
	}, []);

	console.log(data);

	if (loading) {
		return <h1>LOADING...</h1>;
	}
	if (error) {
		return <h1>{`ERROR! ${error.response.data}`}</h1>;
	}

	return (
		<div>
			<h1>Leaderboards:</h1>
			{data && <LeaderboardsTable data={data} avatars={avatars} />}
		</div>
	);
}

export default Leaderboards;
