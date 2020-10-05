import React, { useState } from "react";
import Item from "./Item";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import { Palette } from "../Styles";

// list style
const useStyle = makeStyles(() => ({
	listStyle: {
		maxWidth: 500,
		margin: "30px auto",
		textAlign: "center",
		color: Palette.textPrimary,
	},
	title: {
		marginBottom: "25px",
		paddingBottom: "5px",
		borderBottom: "1px solid",
		borderImage: "radial-gradient( black, transparent) 2",
	},
	card: {
		height: 50,
	},
	addButton: {
		height: 50,
		width: "100%",
		marginTop: "20px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	addPopup: {
		height: "200px",
		width: "100%",
		backgroundColor: Palette.bgPrimarySoft,
		marginBottom: 10,
		display: "flex",
	},
	addPopupForm: {
		width: "80%",
		margin: "auto auto",
		display: "flex",
		flexDirection: "column",
	},
	addPopupInput: {
		margin: "0px auto 15px auto !important",
	},
	addPopupButton: {
		margin: "0px 0px auto auto",
	},
}));

/* 
The component of the To-Do list itself. It is a list of Items, but contains also the add-button and the add-form-popoup (for adding new items).
It appears when a list is found/created from the home find-list popup, desappears when the to-home navbar link is clicked.
*/
export default function List(props) {
	const classes = useStyle();

	// list properties
	const { name } = props.list;
	const [items, setItems] = useState(props.list.items);
	// add-form values
	const [addPopup, setAddPopup] = useState(false);
	const [newItemTitle, setNewItemTitle] = useState("");
	const [newItemBody, setNewItemBody] = useState("");
	const [connectionError, setConnectionError] = useState(false);

	// when add-item button is clicked
	const handleAdd = () => {
		// show the add-form
		setAddPopup(true);
	};

	// when create-item button is clicked on the add-form popup
	const handleCreate = () => {
		// post request to API
		fetch("http://localhost:3001/list/" + name + "/item/add", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ title: newItemTitle, body: newItemBody }),
		})
			.then(function (res) {
				res.json().then((item) => {
					if (item === "ERROR") return setConnectionError(true);
					// push the item in the list
					const newItems = items;
					newItems.push(item);
					setItems(newItems);
					// hide the add-form popup
					setAddPopup(false);
					// raise the list-length-changed event
					props.onListLengthChange(true);
					// reset add-form falues
					setNewItemTitle("");
					setNewItemBody("");
				});
			})
			.catch(function (res) {
				setConnectionError(true);
			});
	};

	// when an item delete button is clicked
	const handleDelete = (_id) => {
		// post request to API
		fetch(
			"http://localhost:3001/list/" + name + "/item/" + _id + "/delete",
			{ method: "POST" }
		)
			.then((res) =>
				res.json().then((list) => {
					// set the new list
					setItems(list.items);
					// raise the list-length-changed event
					props.onListLengthChange(false);
				})
			)
			.catch();
	};

	// when an item is checked
	const onCheck = (checked) => {
		// raise the event
		props.onCheck(checked);
	};

	// component of the add-form popup
	const AddPopup = () => {
		return (
			<Paper elevation={5} className={classes.addPopup}>
				<div className={classes.addPopupForm}>
					<TextField
						id="outlined-basic"
						label="Title"
						variant="outlined"
						fullWidth
						value={newItemTitle}
						onChange={(e) => setNewItemTitle(e.target.value)}
						style={{ marginTop: 20 }}
						size="small"
						className={classes.addPopupInput}
						autoComplete="off"
					/>
					<TextField
						id="outlined-basic"
						label="Details"
						variant="outlined"
						fullWidth
						value={newItemBody}
						onChange={(e) => setNewItemBody(e.target.value)}
						style={{ marginTop: 20 }}
						size="small"
						className={classes.addPopupInput}
						autoComplete="off"
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleCreate}
						className={classes.addPopupButton}
					>
						Create
					</Button>
				</div>
			</Paper>
		);
	};

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			style={{ width: "100%", flexGrow: 1 }}
		>
			<Grid item xs={1} sm={2} md={3}></Grid>
			<Grid item xs={10} sm={8} md={6}>
				<div className={classes.listStyle}>
					<Typography variant="h4" className={classes.title}>
						{name}
					</Typography>
					{items.map((e) => {
						return (
							<Item
								key={e._id}
								item={e}
								list={name}
								onDelete={handleDelete}
								onCheck={onCheck}
							/>
						);
					})}
					{addPopup ? AddPopup() : ""}
					<Button
						className={classes.addButton}
						onClick={handleAdd}
						color="primary"
						variant="contained"
					>
						Add
					</Button>
				</div>
			</Grid>
			<Grid item xs={1} sm={2} md={3}></Grid>
		</Grid>
	);
}
