import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom"
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
}));

const DetailHeader = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/passwords" style={{ color: "white", fontSize: 48, textDecoration: "none" }}>
                        <IconButton className={classes.menuButton}>
                            <span class="material-icons md-48">arrow_back</span>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default DetailHeader;