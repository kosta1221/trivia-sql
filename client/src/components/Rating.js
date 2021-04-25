import { IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";

import { makeStyles } from "@material-ui/core/styles";

import { URL } from "../utils";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		display: `flex`,
		justifyContent: `space-evenly`,
		flexDirection: "column",
		width: "60vmax",
	},
	star: {
		fill: "#d4af37",
	},
}));

function Rating({ question, setCurrentlyDisplayed, refetch, setQuestionsAskedTotal }) {
	const classes = useStyles();

	const [fullStars, setFullStars] = useState(0);

	const handleStarHover = (event) => {
		const value = event.target.getAttribute("value");
		setFullStars(+value);
	};

	const handleStarClick = async (event) => {
		console.log(`${fullStars} stars`);
		const questionWithRating = {
			...question,
			rating: fullStars,
		};
		console.log(questionWithRating);
		try {
			const response = await axios({
				method: "POST",
				url: `${URL}/rate`,
				headers: { "Content-Type": "application/json" },
				data: questionWithRating,
			});
			console.log(response.data);
			await refetch();
		} catch (e) {
			console.log(e);
		} finally {
			setCurrentlyDisplayed("question");
		}
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
				{i <= fullStars && <StarIcon className={classes.star} />}
				{i > fullStars && <StarOutlineIcon className={classes.star} />}
			</IconButton>
		);
	}

	return (
		<div className={classes.root}>
			<h1>Please rate the previous question</h1>
			<div>{fiveStars}</div>
		</div>
	);
}

export default Rating;
