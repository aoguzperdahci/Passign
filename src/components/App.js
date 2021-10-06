import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { green, blue } from "@mui/material/colors";
import Header from './Header';
import PasswordList from './PasswordList';
import DetailHeader from "./DetailHeader";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PasswordDetail from './PasswordDetail';
import { Hidden } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from "react-redux";
import MainPage from './MainPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

const useStyles = makeStyles((theme) =>
createStyles({
  typography: {
    h1: {
      fontSize: "3rem"
    }
  },
  palette: {
    type: "dark",//#303030
    primary: {
      main: green[600]
    },
    secondary: {
      main: blue[600]
    }
  }
}));

const theme = createTheme();


function App({ loginState }) {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>

            <Route path="/" exact>
              {loginState.state ? <Redirect to="/passwords" /> : <MainPage />}
            </Route>

            <Route path="/login" exact>
            {loginState.state ? <Redirect to="/passwords" /> : <LoginPage />}
            </Route>

            <Route path="/signup" exact>
            {loginState.state ? <Redirect to="/passwords" /> : <SignupPage />}
            </Route>

            <Route exact path="/passwords">
              <Header />
              <PasswordList/>
            </Route>

            <Route path="/passwords/:id">
              <Hidden smDown>
                <Header />
                <PasswordList/>
              </Hidden>
              <Hidden mdUp>
                <DetailHeader />
                <PasswordDetail/>
              </Hidden>
            </Route>
            
          </Switch>

        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    loginState: state.accountReducer,
  };
}

export default connect(mapStateToProps)(App);

