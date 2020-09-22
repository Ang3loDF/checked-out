import React from 'react'
import { AppBar, Toolbar, Typography} from '@material-ui/core'

export default function Navbar() {
    return (
        <AppBar position="static" style={{backgroundColor: "white"}}>
            <Toolbar>
                <Typography variant="h5" style={{color: "black"}}>
                    CheckedOut
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
