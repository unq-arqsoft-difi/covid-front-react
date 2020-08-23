import React, { useContext, useState } from 'react';
import {
  makeStyles,
  Button,
  Menu,
  IconButton,
  MenuItem,
} from '@material-ui/core/';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MobileMenu = () => {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const mobileMenuId = 'primary-account-menu-mobile';
  const RenderMobileMenu = () => (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? (
        <MenuItem>
          <Button
            aria-label="account of current user"
            aria-controls="primary-account-menu"
            aria-haspopup="true"
            color="inherit"
            component={Link}
            onClick={logOut}
            to="/"
          >
            Salir
          </Button>
        </MenuItem>
      ) : (
        <>
          <MenuItem>
            <Button
              aria-label="account of current user"
              aria-controls="primary-account-menu"
              aria-haspopup="true"
              color="inherit"
              component={Link}
              to="/register"
            >
              Registrarse
            </Button>
          </MenuItem>
          <MenuItem onClick={null}>
            <Button
              aria-label="account of current user"
              aria-controls="primary-account-menu"
              aria-haspopup="true"
              color="inherit"
              component={Link}
              to="/login"
            >
              Ingresar
            </Button>
          </MenuItem>
        </>
      )}
    </Menu>
  );
  return (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <RenderMobileMenu />
    </div>
  );
};

export default MobileMenu;
