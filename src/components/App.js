import React, { useState } from 'react';
import '../App.css';
import Popup from "./Popup";
import Navbar from "./Navbar";
import List from "./List";
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";


const useStyle = makeStyles(() => ({
  appStyle: {
    backgroundColor: "#E0E2DB",
    width: "100vw",
    height: "100vh",
    marginTop: 0,
    marginLef: 0
  }
}))

function App() {
  const classes = useStyle();
  const [showPopup, setShowPopup] = useState(true);
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState([]);

  const handleGetList = (list) => {
    setShowPopup(false);
    setShowList(true);
    setList(list);
  }

  return (
    <div className="App">
      <Box className={classes.appStyle} >
        <Navbar />
        { showPopup ? <Popup onGetList={handleGetList} /> : "" }
        { showList ? <List list={list} /> : "" }
      </Box>
    </div>
  );
}

export default App;
