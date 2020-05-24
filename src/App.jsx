import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Landing from './components/Landing'
import AuthContextProvider from './contexts/AuthContext';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AuthContextProvider>
        <Router>
          <Navbar></Navbar>
          <Container>
            <Switch>
              <Route path="/" exact>
                <Landing />
              </Route>
              <Route path="/register">
                <SignUp />
              </Route>
              <Route path="/logIn">
                <SignIn />
              </Route>
            </Switch>
          </Container>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
