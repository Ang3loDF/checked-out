import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const useStyle = makeStyles(() => ({
    listStyle: {
        border: "1px solid black",
        maxWidth: 500,
        margin: "auto",
        textAlign: "center"
    },
    card: {
        height: 50,
    },
    addButton: {
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

export default function List(props) {
    const classes = useStyle()
    const {name, items} = props.list;

    return (
        <Grid container direction="row" justify="center" alignItems="center" 
            style={{width: "100%", flexGrow: 1}}
        >
            <Grid item xs={1} sm={2} md={4}></Grid>
            <Grid item xs={10} sm={8} md={4}>
                <div className={classes.listStyle}>
                    <h1>{name}</h1>

                    <Paper className={classes.addButton}>Add</Paper>
                </div>
            </Grid>
            <Grid item xs={1} sm={2} md={4}></Grid>
        </Grid>
    )
}
