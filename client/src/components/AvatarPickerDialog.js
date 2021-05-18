import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import AvatarGrid from "./AvatarGrid";

import { makeStyles } from "@material-ui/core/styles";

function AvatarPickerDialog({ onClose, open, avatarId, setAvatarId, playerName, avatars }) {
	const useStyles = makeStyles({
		dialog: {
			"& .MuiDialog-container > div": {
				width: "70vw",
			},
		},
	});

	const classes = useStyles();

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog
			className={classes.dialog}
			onClose={handleClose}
			aria-labelledby="avatar-picker-dialog-title"
			open={open}
		>
			<DialogTitle id="avatar-picker-dialog-title">Pick an Avatar</DialogTitle>
			<AvatarGrid
				avatarId={avatarId}
				setAvatarId={setAvatarId}
				playerName={playerName}
				avatars={avatars}
				handleAvatarPickerDialogClose={handleClose}
			/>
		</Dialog>
	);
}

export default AvatarPickerDialog;
