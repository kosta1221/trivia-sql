import { axiosInterceptorInstance } from "./interceptors/axiosInterceptors";

export const URL = `/api`;
export const AUTH_URL = `/auth`;

export const savePlayer = (playerToSave) => {
	console.log("trying to save player");
	axiosInterceptorInstance({
		method: "POST",
		url: `${URL}/update-player-score`,
		headers: { "Content-Type": "application/json" },
		data: playerToSave,
	})
		.then((response) => {
			console.log(response);
		})
		.catch((err) => console.log(err));
};

export const checkLeadeboards = async () => {
	console.log("trying to check leaderboards");
	try {
		const response = await axiosInterceptorInstance({
			method: "GET",
			url: `${URL}/leaderboards`,
			headers: { "Content-Type": "application/json" },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
