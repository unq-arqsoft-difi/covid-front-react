import React, { useContext, useState } from 'react';
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListSubheader,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import { AuthContext } from './../../contexts/AuthContext';
import NavbarMobileMenu from './NavbarMobileMenu'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpem] = useState(false);
  const { isAuthenticated, logOut } = useContext(AuthContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpem(open);
  };

  const drawerList = (
    <div
      role="presentation"
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component="div">
            Menú
        </ListSubheader>
        }
        className={classes.root}
      >
      </List>
      <Divider />

    </div>
  )

  const renderRegisterLoginMenu = (
    <div>
      <Button
        color="inherit"
        component={Link}
        to="/register">
        Registrarse
        </Button>
      <Button component={Link} to="/login" color="inherit" variant="outlined">Ingresar</Button>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="absolute" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>
          <Typography className={classes.title} variant="h6" noWrap>
            DIFI Ecosystem
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated() ? (<Button color="inherit" onClick={logOut} component={Link} to="/">Logout</Button>) : renderRegisterLoginMenu}
          </div>
          <NavbarMobileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
