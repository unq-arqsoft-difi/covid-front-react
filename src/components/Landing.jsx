import React from 'react'
import {
  Box,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  subTitleContainer: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  }
}));

const Landing = () => {
  const classes = useStyles()
  return (
    <Box bgcolor='primary' className={classes.subTitleContainer}>
      <Typography variant='h4'>
        Sistema de insumos médicos
        </Typography>
    </Box>);
}

export default Landing;