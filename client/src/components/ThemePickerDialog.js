import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { SketchPicker, CirclePicker } from "react-color";

import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

const backGroundGradients = [
	"linear-gradient(90deg, rgba(24,126,255,1) 0%, rgba(99,212,244,1) 100%)",
	"linear-gradient(318deg, rgba(101,24,255,1) 0%, rgba(171,99,244,1) 100%)",
	"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(178,148,233,1) 100%)",
	"linear-gradient(318deg, rgba(101,24,255,1) 0%, rgba(99,244,235,1) 100%)",
	"linear-gradient(90.5deg, rgba(252, 176, 69, 1) 0%, rgba(243, 244, 99, 1) 100%)",
];

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
			width: "10vmax",
			height: "5vmax",
			backgroundColor: pickedColor,
			border: "2px black solid",
		},
		flex: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			"& > div": {
				marginRight: "5vw",
			},
			"& > p": {
				marginLeft: "5vw",
			},
		},
		backgroundPicker: {
			// "& > span > div > span > div": {
			// 	boxShadow: "none !important",
			// 	background:
			// 		"linear-gradient(90deg, rgba(24,126,255,1) 0%, rgba(99,212,244,1) 100%) !important",
			// },
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
			<div className={classes.flex}>
				<DialogContentText>Pick a primary color:</DialogContentText>
				<div className={classes.box} onClick={handleColorPickerClick}></div>
				{displayColorPicker ? (
					<SketchPicker disableAlpha color={pickedColor} onChangeComplete={handleChangeComplete} />
				) : null}
			</div>
			<div className={classes.flex}>
				<DialogContentText>Pick the game's panel color:</DialogContentText>
				<CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"]} />
			</div>
			<div
				ref={(el) => {
					el &&
						el.querySelectorAll("div > span > div > span > div").forEach((circle, i) => {
							circle.style.background = backGroundGradients[i];
						});
				}}
				className={classes.flex}
			>
				<DialogContentText>Pick a background:</DialogContentText>
				<CirclePicker className={classes.backgroundPicker} colors={backGroundGradients} />
			</div>

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
