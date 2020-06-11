import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

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

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated, logOut } = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          DIFI Ecosystem
            </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {isAuthenticated() ? (
          <Button color="inherit" onClick={logOut} component={Link} to="/">Logout</Button>
        ) : (<div>
          <Button color="inherit" component={Link} to="/register">Registrarse</Button>
          <Button color="inherit" component={Link} to="/logIn">Ingresar</Button>
        </div>
          )}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
