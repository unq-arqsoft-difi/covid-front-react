import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {

  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                required
                fullWidth
                label="Nombre"
                autoFocus
                autoComplete="fname" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                required
                fullWidth
                label="Apellido"
                autoComplete="lname" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                required
                fullWidth
                label="Correo"
                autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                required
                fullWidth
                type="password"
                label="Clave"
                autoComplete="current-password" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="phone"
                name="phone"
                required
                fullWidth
                label="Teléfono" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="entity"
                name="entity"
                required
                fullWidth
                label="Entidad" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="job"
                name="job"
                required
                fullWidth
                label="Puesto/Rol" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="place"
                name="palce"
                required
                fullWidth
                label="Ubicación" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tenes una cuenta? Ingresa
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
