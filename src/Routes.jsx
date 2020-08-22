import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './pages/Register';
import SignIn from './pages/Login';
import Landing from './pages/Landing';
import SupplyRequest from './pages/SupplyRequest';
import SupplyRequests from './pages/SupplyRequests';
import AdminSupplyRequests from './pages/AdminSupplyRequests';
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
