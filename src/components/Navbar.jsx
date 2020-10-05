import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Link,
	Grid,
	LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { Palette } from "../Styles";

// navbar style
const useStyle = makeStyles(() => ({
	nav: {
		backgroundColor: Palette.bgPrimarySoft,
		color: Palette.textPrimary,
	},
}));

/* 
The navbar component. It contains a link (brand name) to come back to Home (find-list popup), and the progress bar that show the percentage
of the items checked in the current list.
*/
export default function Navbar(props) {
	const classes = useStyle();

	// percentage of items checked in the list
	const progress = props.listProperty.length
		? (props.listProperty.checked / props.listProperty.length) * 100
		: 0;

	// when the to-home link is clicked
	const onGoHome = () => {
		props.onGoHome();
	};

	// component of the progress bar showing the percentage of items checked
	const progressBar = () => {
		return (
			<div style={{ width: 200, display: "flex", alignItems: "center" }}>
				<AssignmentTurnedInIcon
					style={{ color: Palette.textPrimary, opacity: 0.8 }}
				></AssignmentTurnedInIcon>
				<div style={{ display: "inline", marginLeft: 10 }}>
					<LinearProgress
						variant="determinate"
						value={progress}
						style={{ width: 150 }}
					></LinearProgress>
				</div>
			</div>
		);
	};

	return (
		<AppBar position="static" className={classes.nav}>
			<Toolbar>
				<Grid justify="space-between" container>
					<Grid item>
						<Typography
							variant="h5"
							onClick={onGoHome}
							hovered="true"
						>
							<Link
								href="/"
								onClick={onGoHome}
								color="inherit"
								underline="none"
							>
								CheckedOut
							</Link>
						</Typography>
					</Grid>
					<Grid
						item
						style={{
							display: "flex",
							alignItems: "center",
							marginRight: "20px",
						}}
					>
						{props.isListShown ? progressBar() : ""}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}
