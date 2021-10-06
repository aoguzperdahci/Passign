import Paper from "@mui/material/Paper";
import PropTypes from 'prop-types';
import React, {useState} from "react";
import InputBase from "@mui/material/InputBase";
import {makeStyles} from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

const useStyles = makeStyles(theme => ({
    searchBarContainer: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing.apply(1),
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: '8px',
        flex: 1
    },
    searchButton: {

    }
}))

const SearchBar = ({onSearch, disabled}) => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState();

    const handleSearchTextChange = event => {
        setSearchText(event.target.value);
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter' && onSearch) onSearch(searchText);
    }

    const handleSearchButton = () => {
        if (onSearch) onSearch(searchText);
    }

    return (
        <Box>
            <Paper className={classes.searchBarContainer}>
                <InputBase
                    className={classes.searchInput}
                    placeholder="Search for a record by website"
                    onChange={handleSearchTextChange}
                    onKeyPress={handleKeyPress}
                    disabled={disabled}
                />
                <IconButton className={classes.searchButton} onClick={handleSearchButton} aria-label="search">
                <span className="material-icons md-48">search</span>
                </IconButton>
            </Paper>
            </Box>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string
}

export default SearchBar;