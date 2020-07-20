import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/Register.jsx';
import SignIn from './components/Login.jsx';
import Landing from './components/Landing.jsx';
import SupplyRequest from './components/SupplyRequest.jsx';
import SupplyRequests from './components/SupplyRequests/SupplyRequests.jsx';
import AdminSupplyRequests from './components/AdminSupplyRequests/AdminSupplyRequests.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

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
        <Route exact path="/admin/request-supplies" component={AdminSupplyRequests} />
      </Switch>
    </Container>
  </Router>
);

export default Routes;
