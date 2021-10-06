import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Box, Button, Hidden, IconButton, TextField, Typography, Tooltip, Snackbar } from "@mui/material";
import { connect } from "react-redux";
import { setRecordsVisible } from "../redux/actions/recordActions";


const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: 0,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        width: "100%",
        position: "sticky",
        top: 60,
        display: "flex"
    },
    form: {
        marginTop: theme.spacing(1),
    },
    container: {
        width: "100%",
        height: "100%",
    },
    textField: {
        width: "85%",
        display: "flex",
    },
    boxField: {
        marginLeft: 20,
        marginTop: theme.spacing(4),
        position: "relative"
    },
    button: {
        display: "inline-block",
        padding: 15,
        position: "absolute",
        bottom: -5,
        left: "85%"
    },
    delete: {
        color: "#ffffff",
        backgroundColor: "#f00",
        marginTop: 50,
        margin: "auto",
        "&:hover": {
            backgroundColor: "#c62828",
        },
    },
}));

//const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

const PasswordDetail = ({ records, editMode, setRecordsVisibleState }) => {

    const { id } = useParams();
    const classes = useStyles();

    const [showPassword, setShowPassword] = React.useState(false);

    const openInNewTab = website => {
        var url = website.includes("https://") ? website : "https://" + website;
        window.open(url, '_blank').focus();
    }

    async function copyToClipboard(text) {
        await navigator.clipboard.writeText(text);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickPasswordGenerate = () => {
        records[id].password = generatePassword();
        setRecordsVisibleState(records);
    };

    const generatePassword = () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&()[]{}*/-+?<|>=_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shuffledChars = shuffle(chars);
        var passwordLength = Math.floor(Math.random() * 10) + 15;
        var password = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * shuffledChars.length);
            password += shuffledChars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }

    const shuffle = (string) => {
        var a = string.split(""),
            n = a.length;

        for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    const handleClickDelete = () => {
        records[id] = {};
        setRecordsVisible(records);
    }

    const handleAlertClose = () => {
        console.log("alert close")
    }

    const handleAlertOpen =  () => {
        console.log("alert open")
        return true;
    }

    const changeHandler = (event) => {
        switch (event.target.name) {
            case "website":
                records[id].website = event.target.value;
                setRecordsVisibleState(records);
                break;
            case "username":
                records[id].username = event.target.value;
                setRecordsVisibleState(records);
                break;
            case "password":
                records[id].password = event.target.value;
                setRecordsVisibleState(records);
                break;
            default:
                break;
        }
    }

    return (
        <Box className={classes.main} component="main">
            <Box className={classes.container}>
                <form className={classes.form} noValidate>
                    <Box className={classes.boxField}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                        >
                            Website
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="website"
                            type="text"
                            id="website"
                            autoComplete="off"
                            disabled={!editMode}
                            className={classes.textField}
                            value={records[id]?.website}
                            onChange={changeHandler}
                        />
                        <Tooltip title={<Typography variant="subtitle2">Open</Typography>}>
                            <IconButton onClick={() => openInNewTab(records[id]?.website)} className={classes.button}>
                                <span style={{ fontSize: 35 }} className="material-icons md-48">open_in_new</span>
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box className={classes.boxField}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                        >
                            Username
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="username"
                            type="text"
                            id="username"
                            autoComplete="off"
                            disabled={!editMode}
                            className={classes.textField}
                            value={records[id]?.username}
                            onChange={changeHandler}
                        />
                        <Tooltip title={<Typography variant="subtitle2">Copy</Typography>}>
                            <IconButton onClick={() => copyToClipboard(records[id].username)} className={classes.button}>
                                <span style={{ fontSize: 35 }} className="material-icons md-48">content_copy</span>
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box className={classes.boxField}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                        >
                            Password
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="password"
                            type={editMode || showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="off"
                            disabled={!editMode}
                            className={classes.textField}
                            value={records[id]?.password}
                            onChange={changeHandler}
                            InputProps={{
                                endAdornment: editMode ? (
                                    <Tooltip title={<Typography variant="subtitle2">Generate new password</Typography>}>
                                        <IconButton onClick={() => handleClickPasswordGenerate()} style={{ left: 10, padding: 10 }}>
                                            <span style={{ fontSize: 30 }} className="material-icons md-48">autorenew</span>
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={<Typography variant="subtitle2">{showPassword ? "Hide password" : "Show password"}</Typography>}>
                                        <IconButton onClick={() => handleClickShowPassword()} style={{ left: 10, padding: 10 }}>
                                            {showPassword ?
                                                (<span style={{ fontSize: 30 }} className="material-icons md-48">visibility</span>) :
                                                (<span style={{ fontSize: 30 }} className="material-icons md-48">visibility_off</span>)}
                                        </IconButton>
                                    </Tooltip>)
                            }}
                        />
                        <Tooltip title={<Typography variant="subtitle2">Copy</Typography>}>
                            <IconButton onClick={() => copyToClipboard(records[id].password)} className={classes.button}>
                                <span style={{ fontSize: 35 }} className="material-icons md-48">content_copy</span>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box style={{ margin: "auto", width: 200 }}>
                        {editMode &&
                            <Link to="/passwords" style={{ textDecoration: "none" }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    className={classes.delete}
                                    onClick={handleClickDelete}
                                    startIcon={<span style={{ fontSize: 30 }} className="material-icons md-48">delete</span>}
                                >
                                    Delete
                                </Button>
                            </Link>}
                    </Box>
                </form>
                <Snackbar open={showPassword && handleAlertOpen()} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Box onClose={handleAlertClose} color="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Box>
                </Snackbar>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        records: state.recordsVisibleReducer,
        editMode: state.editModeReducer,
        loginState: state.accountReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setRecordsVisibleState: (records) => { dispatch(setRecordsVisible(records)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordDetail);