import { IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";

function Rating() {
	const [fullStars, setFullStars] = useState(0);

	const handleStarHover = (event) => {
		const value = event.target.getAttribute("value");
		console.log(value);
		setFullStars(value);
	};

	const handleStarClick = (event) => {
		console.log(`${fullStars} stars`);
	};

	let fiveStars = [];
	for (let i = 1; i <= 5; i++) {
		fiveStars.push(
			<IconButton
				onMouseEnter={handleStarHover}
				onClick={handleStarClick}
				value={i}
				key={`star-${i}`}
			>
				{i <= fullStars && <StarIcon />}
				{i > fullStars && <StarOutlineIcon />}
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
