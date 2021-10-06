import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { setEditMode } from "../redux/actions/editModeActions";
import { setRecordsVisible, updateRecords } from "../redux/actions/recordActions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "absoulute",
    top: 0
  },
  offset: {
    marginBottom: 60
  }
}));

const Header = ({ loginState, records, recordsVisible, encryptionKey, setEditState, editMode, setRecordsVisibleState, updateRecordsState }) => {
  const classes = useStyles();

  const enterEditMode = () => {
    setEditState(true);
  }

  const discardChanges = () => {
    setEditState(false);
    setRecordsVisibleState(records);
  }

  const saveChanges = () => {
    updateRecordsState(loginState.id, loginState.authorization, recordsVisible, encryptionKey);
  }

  const logOut = () => {
    document.location.href = "/";
  }

  const addNew = () => {
    recordsVisible[recordsVisible.length] = { id: recordsVisible.length, visible: true, website: "", username: "", password: "" };
    setRecordsVisibleState(recordsVisible);
  }

  const loggedoutState = () => (
    <Link to="/login" style={{ textDecoration: "none" }} className="wrapper">
      <IconButton className="icon cyan">
        <Typography variant="subtitle2" className="tooltip">
          Log in
        </Typography>
        <span className="material-icons md-48">person</span>
      </IconButton>
    </Link>
  )

  const loggedinState = () => (
    <>
      <Box onClick={() => enterEditMode()} style={{ textDecoration: "none" }} className="wrapper">
        <IconButton className="icon cyan" >
          <Typography variant="subtitle2" className="tooltip">
            Edit
          </Typography>
          <span className="material-icons md-48">edit</span>
        </IconButton>
      </Box>

      <Box onClick={() => logOut()} style={{ textDecoration: "none" }} className="wrapper">
        <IconButton className="icon red">
          <Typography variant="subtitle2" className="tooltip">
            Log out
          </Typography>
          <span className="material-icons md-48">logout</span>
        </IconButton>
      </Box>

      <Box style={{ textDecoration: "none" }} className="wrapper">
        <IconButton className="icon red">
          <Typography variant="subtitle2" className="tooltip">
            Log out
          </Typography>
          <span className="material-icons md-48">done</span>
          <CircularProgress
            size={48}
            style={{
              color: "#ffffff",
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -24,
              marginLeft: -24,
            }} />
        </IconButton>
      </Box>

    </>
  )

  const editState = () => (
    <>
      <Link to={"/passwords/" + recordsVisible.length} style={{ textDecoration: "none" }}>
        <Box onClick={() => addNew()} style={{ textDecoration: "none" }} className="wrapper">
          <IconButton className="icon white">
            <Typography variant="subtitle2" className="tooltip">
              Add new
            </Typography>
            <span className="material-icons md-48">add</span>
          </IconButton>
        </Box>
      </Link>

      <Link to="/passwords" style={{ textDecoration: "none" }}>
        <Box onClick={() => discardChanges()} style={{ textDecoration: "none" }} className="wrapper">
          <IconButton className="icon red">
            <Typography variant="subtitle2" className="tooltip">
              Discard changes
            </Typography>
            <span className="material-icons md-48">close</span>
          </IconButton>
        </Box>
      </Link>

      <Link to="/passwords" style={{ textDecoration: "none" }}>
        <Box onClick={() => saveChanges()} style={{ textDecoration: "none" }} className="wrapper">
          <IconButton className="icon cyan">
            <Typography variant="subtitle2" className="tooltip">
              Save changes
            </Typography>
            <span className="material-icons md-48">done</span>
          </IconButton>
        </Box>
      </Link>

    </>
  )

  return (
    <>
      <AppBar className={classes.appBar}>
        <Container>
          <Toolbar>
            <Box style={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                >
                  Passign
                </Typography>
              </Link>
            </Box>

            {loginState.state ? (editMode ? editState() : loggedinState()) : loggedoutState()}

          </Toolbar>
        </Container>
      </AppBar>
      <Box className={classes.offset} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    editMode: state.editModeReducer,
    loginState: state.accountReducer,
    records: state.recordsReducer,
    recordsVisible: state.recordsVisibleReducer,
    encryptionKey: state.encryptionKeyReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditState: (state) => { dispatch(setEditMode(state)) },
    setRecordsVisibleState: (records) => { dispatch(setRecordsVisible(records)) },
    updateRecordsState: (id, authorization, records, key) => { dispatch(updateRecords(id, authorization, records, key)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);