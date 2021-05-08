import React, { useState } from "react";
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

const paperBackgroundColors = ["#c1e1ec", "#f6f5d7", "#d1c3e6", "#ffaaa3", "#d3d3d3"];

function ThemePickerDialog({ onClose, theme, open }) {
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const [pickedColor, setPickedColor] = useState(theme.palette.primary.main);
	const [pickedPaperBgColor, setPickedPaperBgColor] = useState(theme.palette.paperBackground);
	const [pickedBackground, setPickedBackground] = useState(theme.palette.background);

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
	});

	const classes = useStyles();

	const handleClose = () => {
		onClose(theme);
	};

	const handleColorPickerClick = () => {
		setDisplayColorPicker((prev) => !prev);
	};

	const handleChangeComplete = (color) => {
		setPickedColor(() => color.hex);
	};

	const handlePaperBgChangeComplete = (color) => {
		setPickedPaperBgColor(() => color.hex);
	};

	const handleBackgroundChangeComplete = (_, event) => {
		event.target.classList.toggle("background-picker-clicked");
		event.target
			.closest(".circle-picker")
			.querySelectorAll("div > span > div > span > div")
			.forEach((circle) => {
				if (circle !== event.target) {
					circle.classList.remove("background-picker-clicked");
				}
			});
		setPickedBackground(() => event.target.style.background);
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
				paperBackground: pickedPaperBgColor,
				background: pickedBackground,
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
				<CirclePicker
					colors={paperBackgroundColors}
					onChangeComplete={handlePaperBgChangeComplete}
				/>
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
				<CirclePicker
					className={classes.backgroundPicker}
					colors={backGroundGradients}
					onChangeComplete={handleBackgroundChangeComplete}
				/>
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
