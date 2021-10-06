import React from 'react'
import Grid from '@mui/material/Grid';
import FeedItem from "./FeedItem"
import { Box, Hidden, Container } from "@mui/material";
import { useParams } from 'react-router-dom';
import PasswordDetail from './PasswordDetail';
import { makeStyles } from '@mui/styles';
import SearchBar from './SearchBar';
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3)
    }
}));

const PasswordList = ({ records }) => {

    const { id } = useParams();
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs>
                    <SearchBar />
                    <Box className={classes.box}>
                        {records.map(r => (
                            r.visible && <FeedItem key={r.id} record={r} />
                        ))}
                        <h2></h2>
                    </Box>
                </Grid>
                <Hidden smDown>
                    <Grid item xs>
                        {id && (<PasswordDetail />)}
                    </Grid>
                </Hidden>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        records: state.recordsVisibleReducer,
        loginState: state.accountReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordList);
