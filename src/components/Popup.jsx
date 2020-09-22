import React, { useState } from 'react';
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
    paperStyle: {
        maxWidth: "500px",
        height: "320px",
        margin: "auto",
        padding: "10px 25px"
    },
    containerStyle: {
        paddingTop: "30vh"
    }
}))

const Popup = (props) => {
    const classes = useStyle();
    const [nameInput, setNameInput] = useState("");
    const [connectionErr, setConnectionErr] = useState(false);
    
    // when get listen button si clicked
    const onGetList = () => {
        // try ask to find the list
        fetch('http://localhost:3001/list/' + nameInput)
        .then((res) => {
            if (res.status !== 200) return setConnectionErr(true);
            res.json().then((res) => {
                // if it does't exits, ask to create one
                if (!res[0]) {
                    fetch("http://localhost:3001/list/add",{
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({name: nameInput, items: []})
                    })
                    .then(function(res){ res.text().then(message => { 
                        if (message === "ERROR") return setConnectionErr()
                        // rise the new list
                        else props.onGetList({name: nameInput, items: []})
                     })})
                    .catch(function(res){ console.log(res) })
                }
                // else rise the list
                else props.onGetList(res[0])
            })
        })
        .catch(() => setConnectionErr(true))
    }

    
    const title = (<h1>Choose or create a list</h1>)
    
    const input = (
    <TextField id="outlined-basic" label="List Name" variant="outlined" fullWidth 
        value={nameInput} onChange={e => setNameInput(e.target.value)}
        style={{marginTop: 20}}
    />)
    
    const submit = (
        <div style={{display: "flex", justifyContent: "flex-end", marginTop: 40}}>
            <div style={{display: "flex", justifyContent: "flex-start", width: "100%"}}>
                {connectionErr ? <p style={{color: "red"}}>Connection error</p> : ""}
            </div>
            <Button variant="contained" color="primary" type="submit" onClick={onGetList}
                style={{width: "200px", height: "50px"}}
            >
                Go to list
            </Button>
        </div>  
    )

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
           
    )
}

export default Popup;