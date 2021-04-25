import axios from "axios";

export const URL = `/api`;

export const savePlayer = (playerToSave) => {
	console.log("trying to save player");
	axios({
		method: "POST",
		url: `${URL}/save-player`,
		headers: { "Content-Type": "application/json" },
		data: playerToSave,
	})
		.then((response) => {
			console.log(response);
		})
		.catch((err) => console.log(err));
};
