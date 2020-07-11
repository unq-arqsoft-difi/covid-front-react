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
import Navbar from './components/Navbar/Navbar'
import SignUp from './components/Register'
import SignIn from './components/Login'
import Landing from './components/Landing'
import AuthContextProvider from './contexts/AuthContext';
import SupplyRequest from './components/SupplyRequest';
import SupplyRequests from './components/SupplyRequests/SupplyRequests';


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
          <Navbar />
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
              <Route path="/supply-request">
                <SupplyRequest />
              </Route>
              <Route path="/supply-requests">
                <SupplyRequests />
              </Route>
            </Switch>
          </Container>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
