import React from 'react';
import { Avatar, IconButton, Button, TextField, FormControlLabel, Grid, Box, Typography, Container, Switch, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { connect } from "react-redux";
import { useState } from 'react';
import { getRecords } from "../redux/actions/recordActions"
import { setRememberMe } from "../redux/actions/rememberMeActions"
import CryptoJS from 'crypto-js';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    box: {
        position: "relative",
    },
    button: {
        padding: 15,
        left: 10
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.light
    }
}));

function Login({ login, loginState, rememberMeState, setRememberMeState }) {
    const classes = useStyles();
    const [masterKey, setMasterKey] = useState("");
    const [username, setUsername] = useState("");
    const [shortKey, setShortKey] = useState("");
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false);

    const changeHandler = (event) => {
        switch (event.target.name) {
            case "masterKey":
                setMasterKey(event.target.value);
                break;
            case "username":
                setUsername(event.target.value);
                break;
            case "rememberMe":
                setRememberMe(event.target.checked)
                break;
            case "shortKey":
                setShortKey(event.target.value);
            default:
                break;
        }
    }

    const handleLogin = async (event) => {//IJeMB3J0VM6V5N48hOBi fefd0180993eaf16b633c3d6458a6689420cda87bb51200707d029abbe665b3d asdasd Ae2lP$=j#<XM6r5LEm
        // IJeMB3J0VM6V5N48hOBifefd0180993eaf16b633c3d6458a6689420cda87bb51200707d029abbe665b3dasdasdAe2lP$=j#<XM6r5LEm
        event.preventDefault();
        setLoading(true);
        var id = masterKey.slice(0, 20);
        var salt = masterKey.slice(20, 84);
        var passPhrase = masterKey.slice(84, 90);
        var authPhrase = masterKey.slice(90);
        var generatedKey = CryptoJS.PBKDF2(passPhrase, salt, { keySize: 8, iterations: 1000 });
        var key = CryptoJS.enc.Hex.stringify(generatedKey);
        var authorization = CryptoJS.HmacSHA512(authPhrase, key).toString();
        var hash = CryptoJS.SHA256(passPhrase).toString();
        var token = CryptoJS.AES.encrypt(id + salt + authPhrase, hash).toString();
        var newRememberMe = {
            state: rememberMe,
            username: username,
            token: token
        }
        login(id, authorization, key, newRememberMe);
        //alert messages
        //console.log(key)
        //console.log(id)
        //console.log(salt)
        //console.log(passPhrase)
        //console.log(authPhrase)
        //console.log(authorization)
    }

    const handleLoginRememberMe = (event) => {
        event.preventDefault();
        setLoading(true);
        var token = rememberMeState.token;
        var hash = CryptoJS.SHA256(shortKey).toString();
        var decrypted = CryptoJS.AES.decrypt(token, hash).toString(CryptoJS.enc.Utf8);
        var id = decrypted.slice(0, 20);
        var salt = decrypted.slice(20, 84);
        var authPhrase = decrypted.slice(84);
        var generatedKey = CryptoJS.PBKDF2(shortKey, salt, { keySize: 8, iterations: 1000 });
        var key = CryptoJS.enc.Hex.stringify(generatedKey);
        var authorization = CryptoJS.HmacSHA512(authPhrase, key).toString();
        var newRememberMe = {
            state: true,
            username: rememberMeState.username,
            token: rememberMeState.token
        }
        login(id, authorization, key, newRememberMe);
    }

    async function pasteFromClipboard() {
        const text = await navigator.clipboard.readText();
        setMasterKey(text);
        await navigator.clipboard.writeText("");
    }

    const clearRememberMeState = (event) => {
        event.preventDefault();
        setRememberMeState({
            state: false,
            username: "",
            token: ""
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper} >
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in {rememberMeState.state ? "as " + rememberMeState.username : ""}
                </Typography>
                {rememberMeState.state ? (
                    <form className={classes.form} style={{ width: 400 }} noValidate onSubmit={handleLoginRememberMe}>
                        <Box className={classes.box}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="shortKey"
                                label="Short Key"
                                type="password"
                                id="shortKey"
                                autoComplete="off"
                                value={shortKey}
                                onChange={changeHandler}
                            />
                        </Box>

                        <Box className={classes.box}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                className={classes.submit}
                            >
                                Log In
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    style={{
                                        color: "#43a047",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: -8,
                                        marginLeft: -15,
                                    }}
                                />
                            )}
                        </Box>

                        <Grid container>
                            <Grid item xs>
                                <Link className={classes.link} onClick={clearRememberMeState}>
                                    Log in as a different user
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" className={classes.link}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                ) : (
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
                        <Box className={classes.box}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="masterKey"
                                label="Master Key"
                                type="password"
                                id="masterKey"
                                autoComplete="off"
                                onChange={changeHandler}
                                value={masterKey}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => pasteFromClipboard()} className={classes.button}>
                                            <span style={{ fontSize: 30 }} className="material-icons md-48">content_paste</span>
                                        </IconButton>),
                                }}
                            />

                        </Box>
                        <Grid container>
                            <Grid item xs>
                                <Box mt={3} mb={3}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="rememberMe"
                                                color="primary"
                                                onChange={changeHandler}
                                            />
                                        }
                                        label="Remember me"
                                    />
                                </Box>
                            </Grid>

                            <Box display="block" >
                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        name="username"
                                        label="Username"
                                        type="text"
                                        id="username"
                                        autoComplete="off"
                                        onChange={changeHandler}
                                        disabled={!rememberMe}
                                        value={rememberMe ? username : ""}
                                    />
                                </Grid>
                            </Box>

                        </Grid>

                        <Box className={classes.box}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                            >
                                Log In
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    style={{
                                        color: "#43a047",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: -8,
                                        marginLeft: -15,
                                    }}
                                />
                            )}
                        </Box>

                        <Grid container>
                            <Grid item xs>
                                <Link className={classes.link} to="/passwords">
                                    Log in as a different user
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" className={classes.link}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>)}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        records: state.recordsReadReducer,
        loginState: state.accountReducer,
        rememberMeState: state.rememberMeReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (id, authorization, key, rememberMe) => { dispatch(getRecords(id, authorization, key, rememberMe)) },
        setRememberMeState: (state) => { dispatch(setRememberMe(state)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);