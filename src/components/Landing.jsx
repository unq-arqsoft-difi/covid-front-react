import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  subTitleContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  responsiveImage: {
    position: 'relative',
    width: '80%',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <Box bgcolor="primary" className={classes.subTitleContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Sistema de Insumos Médicos</Typography>
          <div>
            <img
              className={classes.responsiveImage}
              alt="Landing"
              src="https://unsplash.com/photos/sCqkCcYmtlM/download?force=false&w=1920"
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
