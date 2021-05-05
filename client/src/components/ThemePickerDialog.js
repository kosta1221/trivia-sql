import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { SketchPicker } from "react-color";

import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

function ThemePickerDialog({ onClose, theme, open }) {
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const [pickedColor, setPickedColor] = useState(theme.palette.primary);
	console.log(pickedColor);

	const useStyles = makeStyles({
		dialog: {
			"& .MuiDialog-container > div": {
				width: "70vw",
			},
		},
		box: {
			width: "15vw",
			height: "7vw",
			backgroundColor: pickedColor,
			border: "2px black solid",
		},
	});

	const classes = useStyles();

	const handleClose = () => {
		onClose(theme);
	};

	const handleColorPickerClick = () => {
		setDisplayColorPicker((prev) => !prev);
	};

	const handleChangeComplete = (color) => {
		console.log(color);
		setPickedColor(() => color.hex);
	};

	const handleSaveChanges = () => {
		const newTheme = createMuiTheme({
			palette: {
				primary: {
					main: pickedColor,
				},
				secondary: {
					main: "#d32f2f",
				},
				doneGreen: {
					main: "green",
				},
				paperBackground: "#f6f5d7",
				background:
					"linear-gradient(90.5deg, rgba(252, 176, 69, 1) 0%, rgba(243, 244, 99, 1) 100%)",
			},
		});
		onClose(newTheme);
	};

	return (
		<Dialog
			className={classes.dialog}
			onClose={handleClose}
			aria-labelledby="theme-picker-dialog-title"
			open={open}
		>
			<DialogTitle id="theme-picker-dialog-title">Pick a Theme</DialogTitle>
			<DialogContentText>Pick a primary color</DialogContentText>
			<div className={classes.box} onClick={handleColorPickerClick}></div>
			{displayColorPicker ? (
				<SketchPicker disableAlpha color={pickedColor} onChangeComplete={handleChangeComplete} />
			) : null}

			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>

				<Button onClick={handleSaveChanges} color="primary">
					Save Changes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ThemePickerDialog;
