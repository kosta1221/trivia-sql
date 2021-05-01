import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import { saveAvatarOfPlayer } from "../utils";

const useStyles = makeStyles((theme) => ({
	grid: {
		display: "grid",
		placeItems: "center",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
	},
	avatar: {
		margin: theme.spacing(1),
		border: "2px transparent solid",
		"&:hover": {
			cursor: "pointer",
		},
	},
	chosen: {
		border: "2px blue solid",
	},
}));

function AvatarGrid({ avatars, playerName, avatarId, setAvatarId }) {
	const classes = useStyles();

	const handleAvatarClick = async (e) => {
		const chosenAvatarId = +e.target.parentNode.getAttribute("value");
		setAvatarId(() => chosenAvatarId);
		console.log("chosen avatar id: ", chosenAvatarId);
		await saveAvatarOfPlayer({ name: playerName, avatar_id: chosenAvatarId });
	};

	return (
		<div className={classes.grid}>
			{avatars &&
				avatars.map((avatar, i) => {
					return (
						<Avatar
							key={`avatar-${i}`}
							value={i + 1}
							onClick={handleAvatarClick}
							className={
								avatarId === i + 1 ? `${classes.avatar} ${classes.chosen}` : classes.avatar
							}
							alt="Avatar"
							src={`${process.env.PUBLIC_URL}${avatar.img_src}`}
						/>
					);
				})}
		</div>
	);
}

export default AvatarGrid;
