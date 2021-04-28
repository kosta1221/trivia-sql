import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRouter } from "./useRouter";

import { URL } from "../utils";

const useStyles = makeStyles((theme) => ({
	root: {
		height: `100vh`,
		display: `flex`,
		justifyContent: `center`,
	},
	buttonsFlex: {
		display: `flex`,
		justifyContent: `center`,
		flexDirection: "column",
		width: "50vmax",
	},
	mainButton: {
		margin: "1vh",
		width: "100%",
	},
	textField: {
		margin: theme.spacing(1),
		width: "50vmax",
	},
	mainHeader: {
		fontSize: "4rem",
		marginBottom: "10vmax",
	},
	linkWithButton: {
		textDecoration: "none",
	},
}));

function SignUpPage() {
	const classes = useStyles();
	const router = useRouter();

	const [arePasswordsSame, setArePasswordsSame] = useState(true);
	const [error, setError] = useState(false);

	const onFormSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);

		const body = {};
		formData.forEach((value, property) => (body[property] = value));

		if (body.password !== body.passwordConfirmation) {
			setArePasswordsSame(() => false);
			return;
		} else {
			setArePasswordsSame(() => true);
		}

		try {
			const response = await axios({
				method: "POST",
				url: `${URL}/signup`,
				headers: { "Content-Type": "application/json" },
				data: body,
			});

			if (response.status === 201) {
				router.push("/login");
			} else {
				setError(() => true);
			}
		} catch (error) {
			setError(() => true);
		}
	};

	return (
		<div className={classes.buttonsFlex}>
			<h1 className={classes.mainHeader}>Countrivia!</h1>
			{!arePasswordsSame && <h2>Passwords have to match up!</h2>}
			{error && <h1>Error</h1>}
			<form id="signup-form" onSubmit={onFormSubmit}>
				<TextField
					autoFocus
					className={classes.textField}
					id="name-input"
					name="playerName"
					label="Name"
					type="text"
					placeholder="Enter your name..."
					required
				/>
				<TextField
					type="password"
					className={classes.textField}
					id="password-input"
					name="password"
					label="Password"
					placeholder="Enter your password..."
					required
				/>
				<TextField
					type="password"
					className={classes.textField}
					id="password-input-2"
					name="passwordConfirmation"
					label="Confirm Password"
					placeholder="Confirm your password..."
					required
				/>
				<Button
					className={classes.mainButton}
					type="submit"
					form="signup-form"
					label="Submit"
					variant="outlined"
					color="primary"
				>
					Sign Up
				</Button>
			</form>
			<Link className={classes.linkWithButton} exact to="/login">
				<Button className={classes.mainButton} variant="outlined" color="primary">
					Back To Login
				</Button>
			</Link>
		</div>
	);
}

export default SignUpPage;
