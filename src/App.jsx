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
import Navbar from './Navbar'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Landing from './Landing'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
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
      </div>
    </Router>
  );
}

export default App;
