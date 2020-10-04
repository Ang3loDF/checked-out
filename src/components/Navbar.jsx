import React from 'react'
import { AppBar, Toolbar, Typography, Link, Grid, LinearProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Palette } from '../Styles';

const useStyle = makeStyles(() => ({
    nav: {
        backgroundColor: Palette.bgPrimarySoft,
        color: Palette.textPrimary
    }
}))

export default function Navbar(props) {
    const classes = useStyle();
    const progress = props.listProperty.length ? props.listProperty.checked / props.listProperty.length * 100 : 0;

    const onGoHome = () => {
        props.onGoHome();
    }

    const progressBar = () => {
        return (
            <div style={{width: 200, display: "flex", alignItems: "center"}}>
                <AssignmentTurnedInIcon style={{color: Palette.textPrimary, opacity: 0.8}}></AssignmentTurnedInIcon>
                <div style={{display:"inline", marginLeft: 10}}>
                    <LinearProgress variant="determinate" value={progress} style={{width: 150}}></LinearProgress>
                </div>
            </div>
        )
    }

    return (
        <AppBar position="static" className={classes.nav}>
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item>
                        <Typography variant="h5" onClick={onGoHome} hovered="true">
                            <Link href="/" onClick={onGoHome} color="inherit" underline="none">
                                CheckedOut
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item style={{display: "flex", alignItems: "center", marginRight: "20px"}}>
                        {props.isListShown ? progressBar() : ""}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
