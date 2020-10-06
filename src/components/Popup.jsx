import React, { useState } from "react";
import { Paper, Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Palette } from "../Styles";

// popup style
const useStyle = makeStyles(() => ({
	paperStyle: {
		maxWidth: "500px",
		height: "270px",
		margin: "auto",
		padding: "30px 25px",
		backgroundColor: Palette.bgPrimarySoft,
		color: Palette.textPrimary,
	},
	containerStyle: {
		paddingTop: "30vh",
	},
	title: {
		marginBottom: "15px",
	},
	button: {
		width: "200px",
		height: "50px",
	},
	input: {
		color: Palette.textPrimary,
	},
}));

/* 
The find-list home-popup. It contains a text-field and a submit button that let the user search/create a list and open it.
*/
const Popup = (props) => {
	const classes = useStyle();

	// value of the text-field for the name of the list
	const [nameInput, setNameInput] = useState("");
	const [connectionErr, setConnectionErr] = useState(false);

	// when open-list button is clicked
	const onGetList = () => {
		// ask to find the list
		fetch(process.env.REACT_APP_BASE_URL + "list/" + nameInput)
			.then((res) => {
				if (res.status !== 200) return setConnectionErr(true);
				res.json().then((res) => {
					// if it does't exits, ask to create one
					if (!res[0]) {
						fetch(process.env.REACT_APP_BASE_URL + "list/add", {
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							method: "POST",
							body: JSON.stringify({
								name: nameInput,
								items: [],
							}),
						})
							.then(function (res) {
								res.text().then((message) => {
									if (message === "ERROR")
										return setConnectionErr();
									// rise the new list
									else
										props.onGetList({
											name: nameInput,
											items: [],
										});
								});
							})
							.catch(function (res) {
								console.log(res);
							});
					}
					// else rise the list
					else props.onGetList(res[0]);
				});
			})
			.catch(() => setConnectionErr(true));
	};

	// component of the header
	const title = (
		<Typography variant="h5" className={classes.title}>
			Choose or create a list
		</Typography>
	);

	// component of the text-field
	const input = (
		<TextField
			id="outlined-basic"
			label="List Name"
			variant="outlined"
			fullWidth
			value={nameInput}
			onChange={(e) => setNameInput(e.target.value)}
			style={{ marginTop: 20 }}
			autoComplete="off"
			InputProps={{ className: classes.input }}
		/>
	);

	// component of the button
	const submit = (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-end",
				marginTop: 40,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-start",
					width: "100%",
				}}
			>
				{connectionErr ? (
					<p style={{ color: "red" }}>Connection error</p>
				) : (
					""
				)}
			</div>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				onClick={onGetList}
				className={classes.button}
			>
				<Typography>Open</Typography>
			</Button>
		</div>
	);

	return (
		<Grid container direction="row" justify="center" alignItems="center">
			<Grid item xs={2} md={4}></Grid>
			<Grid item xs={8} md={4}>
				<div className={classes.containerStyle}>
					<Paper elevation={10} className={classes.paperStyle}>
						{title}
						{input}
						{submit}
					</Paper>
				</div>
			</Grid>
			<Grid item xs={2} md={4}></Grid>
		</Grid>
	);
};

export default Popup;
