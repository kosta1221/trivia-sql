import { IconButton } from "@material-ui/core";
import React from "react";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

function Rating() {
	let fiveStars = [];
	for (let i = 0; i < 5; i++) {
		fiveStars.push(
			<IconButton key={`star-${i}`}>
				<StarOutlineIcon />
			</IconButton>
		);
	}

	return (
		<div>
			<h1>Please rate the previous question</h1>
			{fiveStars}
		</div>
	);
}

export default Rating;
