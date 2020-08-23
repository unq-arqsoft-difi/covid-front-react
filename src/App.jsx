import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AuthContextProvider from './contexts/AuthContext';
import Routes from './Routes';

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
        <Routes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
