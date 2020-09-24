import React from 'react'
import { AppBar, Toolbar, Typography, Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from '../Styles';

const useStyle = makeStyles(() => ({
    nav: {
        backgroundColor: Palette.bgPrimarySoft,
        color: Palette.textPrimary
    }
}))

export default function Navbar(props) {
    const classes = useStyle();

    const onGoHome = () => {
        props.onGoHome();
    }

    return (
        <AppBar position="static" className={classes.nav}>
            <Toolbar>
                <Typography variant="h5" onClick={onGoHome} hovered>
                    <Link href="/" onClick={onGoHome} color="inherit" underline="none">
                        CheckedOut
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
