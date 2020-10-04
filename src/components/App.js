import React, { useState } from 'react';
import '../App.css';
import { Palette } from "../Styles";
import Popup from "./Popup";
import Navbar from "./Navbar";
import List from "./List";
import { Box } from "@material-ui/core"
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ListAltOutlined } from '@material-ui/icons';


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
  
  const [checkCount, setCheckCount] = useState(0)
  const [listLength, setListLength] = useState(0)

  const handleGetList = (list) => {
    setList(list);
    setListLength(list.items.length)
    setCheckCount(list.items.filter(i => i.checked === true).length)
    setShowPopup(false);
    setShowList(true);
  }

  const handleGoHome = () => {
    setShowPopup(true);
    setShowList(false);
  }

  const handleCheck = (checked) => {
    setCheckCount(checked ? checkCount + 1 : checkCount - 1)
  }

  const handleListLengthChange = (add) => {
    setListLength(add ? listLength + 1 : listLength - 1)
  }

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Box className={classes.appStyle} >
          <Navbar onGoHome={handleGoHome} isListShown={showList} listProperty={{checked: checkCount, length: listLength}} />
          { showPopup ? <Popup onGetList={handleGetList} /> : "" }
          { showList ? <List list={list} onCheck={handleCheck} onListLengthChange={handleListLengthChange}/> : "" }
        </Box>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
