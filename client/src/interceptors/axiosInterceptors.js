import axios from "axios";
import { AUTH_URL } from "../utils";
export const axiosInterceptorInstance = axios.create();

// Response interceptor for API calls
axiosInterceptorInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log(axiosInterceptorInstance.interceptors.response);
		console.log("using interceptor!", originalRequest);
		if (originalRequest && error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			console.log(originalRequest.headers.Authorization.split(" ")[1]);
			const {
				data: { accessToken },
			} = await axios({
				method: "POST",
				url: `${AUTH_URL}/access-token-generate`,
				headers: { "Content-Type": "application/json" },
				data: {
					refreshToken: JSON.parse(localStorage.getItem("refreshToken")).refresh_token,
				},
			});
			console.log(accessToken);
			axiosInterceptorInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
			originalRequest.headers["Authorization"] = "Bearer " + accessToken;
			return axiosInterceptorInstance(originalRequest);
		}
		return Promise.reject(error);
	}
);
