import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import SignUp from './SignUp'
import SignIn from './SignIn'
import Landing from './Landing'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              DIFI Ecosystem
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/register">Registrarse</Button>
            <Button color="inherit" component={Link} to="/logIn">Ingresar</Button>
          </Toolbar>
        </AppBar>
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
