import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/Register';
import SignIn from './components/Login';
import Landing from './components/Landing';
import SupplyRequest from './components/SupplyRequest';
import SupplyRequests from './components/SupplyRequests/SupplyRequests';
import AdminSupplyRequests from './components/AdminSupplyRequests/AdminSupplyRequests';
import Navbar from './components/Navbar/Navbar';

const Routes = () => (
  <Router>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/logIn" component={SignIn} />
        <Route exact path="/supply-request" component={SupplyRequest} />
        <Route exact path="/supply-requests" component={SupplyRequests} />
        <Route
          exact
          path="/admin/request-supplies"
          component={AdminSupplyRequests}
        />
      </Switch>
    </Container>
  </Router>
);

export default Routes;
