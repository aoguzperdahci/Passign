import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Avatar, Box, TextField, Typography, Grid, Button, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import CryptoJS from 'crypto-js';
import jsPDF from 'jspdf';
import data from "../images/pdfBackground";
import { createAccount } from "../redux/actions/accountActions";
import { setSnackbar } from '../redux/actions/snackbarActions';



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

const Signup = ({ create, account, setSnackbarAlert }) => {
    const classes = useStyles();
    const [shortKey, setShortKey] = useState();
    const [encryptionKey, setEncryptionKey] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (account.id !== "") {
            createPdf();
        }
        setLoading(false);
    }, [account])

    const handleClose = () => {
        document.location.href = "/login";
    };

    async function copyToClipboard(text) {
        await navigator.clipboard.writeText(text);
    }

    const changeHandler = (event) => {
        setShortKey(event.target.value);
    }

    const generateAuthPhrase = () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&()[]{}*/-+?<|>=_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shuffledChars = shuffle(chars);
        var phraseLength = 16;
        var phrase = "";

        for (var i = 0; i < phraseLength; i++) {
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
        try {
            if (shortKey.length < 4) {//vEnlracswbCshtvc4tcjfe8cd472c58c19cf0e2a38d7a455625a15972cc6b909edff363aa204874bc7cc*#FE=]F|w@h=]|-Fqweqwe
                throw shortKey;
            }
            var salt = CryptoJS.lib.WordArray.random(32);
            var saltString = CryptoJS.enc.Hex.stringify(salt);
            var generatedKey = CryptoJS.PBKDF2(shortKey, saltString, { keySize: 8, iterations: 1000 });
            var key = CryptoJS.enc.Hex.stringify(generatedKey);
            var authorization = generateAuthPhrase();
            var authorizationToken = CryptoJS.HmacSHA512(authorization, key);
            setEncryptionKey(saltString + authorization + shortKey);
            setLoading(true);
            create(authorizationToken.toString());
            //setOpen(true);
        } catch (error) {
            var alert = {
                show: true,
                message: "Account could not be created. Please try again.",
                color: "#f00"
            };
            setSnackbarAlert(alert);
            setLoading(false);
        }
    }

    const createPdf = () => {
        var imgData = data;
        var doc = new jsPDF({
            orientation: "landscape",
            format: [1920, 1080],
            unit: "px"
        })
        doc.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);

        doc.setFillColor(187, 187, 187);
        doc.roundedRect(605, 180, 1070, 50, 5, 5, "F");

        doc.setLineWidth(1)
        doc.setDrawColor(0)
        doc.setFillColor(255, 59, 71)
        doc.circle(620, 195, 7, "FD")

        doc.setFillColor(255, 193, 0)
        doc.circle(640, 195, 7, "FD")

        doc.setFillColor(0, 215, 66)
        doc.circle(660, 195, 7, "FD")

        doc.setFont("Courier");//Master Key: XxSGaMHD1Cv5PcM8Np8Jc72e32e8328fe1d9e904c4a97ae 95925e4a98dca59bcebbad8f9fd2714c42848[Kag0p5r?(]$5B(]asdasd    
        doc.setFontSize(30)
        doc.text(980, 200, "Terminal-- -bash --80x24")

        doc.setLineWidth(0);
        doc.setFillColor(21, 21, 21);
        doc.rect(605, 210, 1070, 545, "F");
        doc.roundedRect(605, 210, 1070, 550, 5, 5, "F");

        var index = Math.ceil(shortKey.length / 2) + 24;

        doc.setTextColor(255, 255, 255)
        doc.text(630, 270, "Passign:~ anonymous-user$ login -info")
        doc.text(630, 310, "Master Key: " + account.id + encryptionKey.slice(0, index))
        doc.text(630, 350, encryptionKey.slice(index))
        doc.text(630, 390, "Short Key: " + shortKey)
        doc.text(630, 430, "Website: ")
        doc.text(630, 510, "Passign:~ anonymous-user$ contact -info")
        doc.text(630, 550, "Email: ahmetoguzperdahci@gmail.com")
        doc.text(630, 590, "Linkedin: www.linkedin.com/in/aoguzperdahci")
        doc.link(760, 575, 450, 20, { url: "https://www.linkedin.com/in/aoguzperdahci/" });
        doc.text(630, 630, "Github: www.github.com/aoguzperdahci")
        doc.link(735, 615, 380, 20, { url: "https://github.com/aoguzperdahci" });
        doc.text(630, 710, "Passign:~ anonymous-user$ |")

        doc.save("Passign.pdf")
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="shortKey"
                            label="Short key"
                            type="text"
                            id="shortKey"
                            autoComplete="off"
                            helperText="Please enter a memorable short key of at least 4 characters long."
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

                <Dialog open={account.id !== ""} onClose={handleClose} className={classes.paper}>
                    <Box style={{ width: 500 }}>
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
                                disabled={true}
                                value={account.id + encryptionKey}
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

            </div>
        </Container>
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
        setSnackbarAlert: (state) => { dispatch(setSnackbar(state)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

