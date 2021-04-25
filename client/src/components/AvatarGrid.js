import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
	grid: {
		display: "grid",
		placeItems: "center",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
	},
	avatar: {
		margin: theme.spacing(1),
	},
}));

function AvatarGrid({ avatars }) {
	const classes = useStyles();

	return (
		<div className={classes.grid}>
			{avatars &&
				avatars.map((avatar, i) => {
					console.log(`${process.env.PUBLIC_URL}${avatar.img_src}`);
					return (
						<Avatar
							key={`avatar-${i}`}
							className={classes.avatar}
							alt="Avatar"
							src={`${process.env.PUBLIC_URL}${avatar.img_src}`}
						/>
					);
				})}
		</div>
	);
}

export default AvatarGrid;
