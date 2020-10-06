import React, { useState } from "react";
import { Paper, Checkbox, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Palette } from "../Styles";

// item syle
const useStyle = makeStyles(() => ({
	root: {
		height: 70,
		width: "100%",
		margin: "10px 0px",
		backgroundColor: Palette.bgPrimarySoft,
		display: "flex",
		alignContent: "center",
	},
	checkbox: {
		justifySelf: "start",
	},
	textContainer: {
		alignSelf: "center",
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		justifyContent: "center",
		marginLeft: 10,
		maxWidth: "80%",
		height: "150%",
	},
	title: {
		alignSelf: "start",
		maxWidth: "100%",
		wordWrap: "break-word",
	},
	body: {
		alignSelf: "start",
		fontSize: "14px",
		maxWidth: "100%",
		wordWrap: "break-word",
		textAlign: "left",
	},
	delete: {
		width: 15,
		height: 15,
		fontSize: 24,
		alignSelf: "flex-start",
		margin: "5px 5px auto auto",
		color: Palette.textPrimary,
		opacity: "0.8",
	},
}));

/* 
The component of the single item in the list. It is a card containing a title, a body, a checkbox and a delete button.
*/
export default function Item(props) {
	const classes = useStyle();

	// properties of the item
	const { title, body, _id } = props.item;
	// checked state
	const [checked, setChecked] = useState(props.item.checked);

	// when the item is ckecked
	const handleCheck = () => {
		fetch(
			process.env.REACT_APP_BASE_URL +
				"list/" +
				props.list +
				"/item/" +
				_id +
				"/check",
			{ method: "POST" }
		)
			.then((res) =>
				res.json().then((item) => {
					// change state
					setChecked(item.checked);
					// raise the event
					props.onCheck(item.checked);
				})
			)
			.catch();
	};

	// when the trash icon is clicked
	const onDelete = () => {
		// when an item is deleted, it is also unchecked, so raise the event
		if (checked) props.onCheck(false);
		// raise the event
		props.onDelete(_id);
	};

	return (
		<Paper className={classes.root} elevation={3}>
			<Checkbox
				color="primary"
				checked={checked}
				onChange={handleCheck}
				className={classes.checkbox}
			/>
			<div className={classes.textContainer}>
				<div className={classes.title}>
					<strong>
						{title.length > 30
							? title.substring(0, 30) + "..."
							: title}
					</strong>
				</div>
				<div className={classes.body}>
					{body.length > 60 ? body.substring(0, 60) + "..." : body}
				</div>
			</div>
			<IconButton
				variant="contained"
				onClick={onDelete}
				className={classes.delete}
			>
				<DeleteIcon fontSize="inherit" />
			</IconButton>
		</Paper>
	);
}
