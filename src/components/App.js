import React, { useState } from 'react';
import '../App.css';
import { Palette } from "../Styles";
import Popup from "./Popup";
import Navbar from "./Navbar";
import List from "./List";
import { Box } from "@material-ui/core"
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


const useStyle = makeStyles(() => ({
  appStyle: {
    backgroundImage: "linear-gradient(to bottom right,"+Palette.bgPrimary+", "+Palette.bgSecondary+")",
    width: "100vw",
    minHeight: "100vh",
    height: "120%",
    marginTop: 0,
    marginLef: 0
  }
}))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Palette.primary,
      contrastText: Palette.textSecondary
    }
  }
});  

function App() {
  const classes = useStyle();
  const [showPopup, setShowPopup] = useState(true);
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState([]);

  const handleGetList = (list) => {
    setList(list);
    setShowPopup(false);
    setShowList(true);
  }

  const handleGoHome = () => {
    setShowPopup(true);
    setShowList(false);
  }

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Box className={classes.appStyle} >
          <Navbar onGoHome={handleGoHome}/>
          { showPopup ? <Popup onGetList={handleGetList} /> : "" }
          { showList ? <List list={list} /> : "" }
        </Box>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
