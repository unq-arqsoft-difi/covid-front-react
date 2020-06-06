import React, { useState, useContext } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from '../contexts/AuthContext'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { authenticateWith } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', pass: '' })
  const [requestStatus, setRequestStatus] = useState({ status: null });
  let history = useHistory();
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    authenticateWith(data).then(history.push("/")).catch(setRequestStatus({ status: 'error' }))
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        {requestStatus.status === 'success' &&
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert className={classes.alert} severity="success">Credenciales correctas. Token obtenido.</Alert>
            </Grid>
          </Grid>
        }
        {
          requestStatus.status === 'error' &&
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert className={classes.alert} severity="error">Email o contraseña incorrectos.</Alert>
            </Grid>
          </Grid>
        }
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Constraseña"
            type="password"
            id="pass"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"¿No tenes cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div >
      <Box mt={8}>
      </Box>
    </Container >
  );
}
