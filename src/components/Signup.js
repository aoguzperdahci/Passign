import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, TextField, Grid, Button, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import CryptoJS from 'crypto-js';
import { createAccount } from "../redux/actions/accountActions"


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
        width: 400,
        marginRight: 500
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    box: {
        position: "relative",
        marginTop: -15
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

const Signup = ({ create, account }) => {
    const classes = useStyles();
    const [shortKey, setShortKey] = useState();
    const [encryptionKey, setEncryptionKey] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        document.location.href="/login";
    };

    async function copyToClipboard(text) {
        await navigator.clipboard.writeText(text);
    }

    const getKey = (shortKey) => {
        //var saltPre = CryptoJS.enc.Hex.parse("f56896d5f03d32e4169185cd02c09e15b65460bfbf900928d1ea9bfdd045bb04")
        var k = CryptoJS.SHA256("abcdef")
        var j = CryptoJS.enc.Hex.stringify(k)
        console.log(j)
        var encrypted = CryptoJS.AES.encrypt("ahmet", j);
        console.log(encrypted.toString())
        var decrypted = CryptoJS.AES.decrypt(encrypted + "", j)
        console.log(decrypted.toString(CryptoJS.enc.Utf8))
    }

    const changeHandler = (event) => {
        switch (event.target.name) {
            case "shortKey":
                setShortKey(event.target.value);
                break;
            default:
                break;
        }
    }

    const generatePhrase = () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&()[]{}*/-+?<|>=_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shuffledChars = shuffle(chars);
        var phraseLength = Math.floor(Math.random() * 15) + 5;
        var phrase = "";

        for (var i = 0; i <= phraseLength; i++) {
            var randomNumber = Math.floor(Math.random() * shuffledChars.length);
            phrase += shuffledChars.substring(randomNumber, randomNumber + 1);
        }
        return phrase;
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        var salt = CryptoJS.lib.WordArray.random(32);
        var saltString = CryptoJS.enc.Hex.stringify(salt);
        var key = CryptoJS.PBKDF2(shortKey, saltString, { keySize: 8, iterations: 1000 });
        var aesKey = CryptoJS.enc.Hex.stringify(key);
        var authorization = generatePhrase();
        var authorizationToken = CryptoJS.HmacSHA512(authorization, aesKey);
        setEncryptionKey(saltString + shortKey + authorization);
        setLoading(true);
        create(authorizationToken.toString());
        //setOpen(true);
    }

    return (
        <div className={classes.paper}>
            <Container component="main" maxWidth="xs">
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="shortKey"
                            label="Short Key"
                            type="text"
                            id="shortKey"
                            autoComplete="off"
                            helperText="Please enter a 6 character long rememberable key"
                            onChange={changeHandler}
                        />
                    </Box>

                    <Box className={classes.box}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Sign up
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
                            <Link href="#" className={classes.link}>
                                unutma{account.id}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/login" className={classes.link}>
                                Have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>

                <Dialog open={account.id} onClose={handleClose} className={classes.paper}>
                    <Box style={{width: 500}}>
                    <DialogTitle>Account Created</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="masterKey"
                            label="Master Key"
                            type="text"
                            fullWidth
                            variant="outlined"
                            disabled="true"
                            value={ account.id + encryptionKey }
                            InputProps={{
                                endAdornment: (
                                <IconButton onClick={() => copyToClipboard(account.id + encryptionKey)} className={classes.button}>
                                    <span style={{ fontSize: 30 }} className="material-icons md-48">content_copy</span>
                                </IconButton>),
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Log in</Button>
                    </DialogActions>
                    </Box>
                </Dialog>

            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        account: state.accountReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        create: (authorizationToken) => { dispatch(createAccount(authorizationToken)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

