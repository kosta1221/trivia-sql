import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRouter } from "./useRouter";

import { AUTH_URL } from "../utils";

import ToggleButton from "@material-ui/lab/ToggleButton";
import CheckIcon from "@material-ui/icons/Check";

import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";

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
	toggle: {
		margin: 0,
		padding: 0,
		width: "3vmax",
		height: "3vmax",
		marginRight: "2vmax",
		marginLeft: "1vmax",
	},
	flex: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		height: "5vmax",
	},
}));

function LoginPage({
	playerName,
	setPlayerName,
	setIsPlayer,
	setRefreshToken,
	rememberPlayer,
	setRememberPlayer,
}) {
	const classes = useStyles();
	const router = useRouter();

	const [error, setError] = useState({ isError: false, message: null });

	const onFormSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);

		const body = {};
		formData.forEach((value, property) => (body[property] = value));

		setPlayerName(() => body.playerName);
		setIsPlayer(() => true);

		try {
			const response = await axios({
				method: "POST",
				url: `${AUTH_URL}/login`,
				headers: { "Content-Type": "application/json" },
				data: body,
			});

			if (response.status === 200) {
				axiosInterceptorInstance.defaults.headers.common["Authorization"] =
					"Bearer " + response.data.accessToken;
				setRefreshToken(() => response.data.refreshToken);
				router.push("/home");
			} else {
				setError(() => ({ isError: true, message: "bad attempt to login" }));
			}
		} catch (err) {
			console.log(err.response.data);
			setError(() => ({ isError: true, message: err.response.data }));
		}
	};

	return (
		<div className={classes.buttonsFlex}>
			<h1 className={classes.mainHeader}>Countrivia!</h1>
			{error && <h1>{error.message}</h1>}
			<form id="login-form" onSubmit={onFormSubmit}>
				<TextField
					autoFocus
					className={classes.textField}
					error={playerName === "" ? true : false}
					id="name-input"
					name="playerName"
					label="Name"
					type="text"
					placeholder="Enter your name..."
					defaultValue={playerName}
					required
				/>
				<TextField
					type="password"
					className={classes.textField}
					error={playerName === "" ? true : false}
					id="password-input"
					name="password"
					label="Password"
					placeholder="Enter your password..."
					required
				/>
				<div className={classes.flex}>
					<ToggleButton
						className={classes.toggle}
						value="check"
						size="small"
						selected={rememberPlayer}
						onChange={() => {
							setRememberPlayer((prev) => !prev);
						}}
					>
						{rememberPlayer === true && <span>✔</span>}
					</ToggleButton>
					<p>remember me?</p>
				</div>
				<Button
					className={classes.mainButton}
					type="submit"
					form="login-form"
					label="Submit"
					variant="outlined"
					color="primary"
				>
					Login
				</Button>
			</form>
			<Link className={classes.linkWithButton} to="/signup">
				<Button className={classes.mainButton} variant="outlined" color="primary">
					Sign Up
				</Button>
			</Link>
		</div>
	);
}

export default LoginPage;
