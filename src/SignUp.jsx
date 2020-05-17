import React, { useState } from 'react'
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
import axios from 'axios';

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

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    phone: '',
    entity: '',
    job: '',
    place: '',
  });
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:9004/registry",
      data: data
    }).then((response) => {
      if (response.status === 201) {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.status >= 400 ) {
        alert("Message failed to send.")
      }
    })
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                required
                fullWidth
                label="Nombre"
                autoFocus
                autoComplete="fname"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                required
                fullWidth
                label="Apellido"
                autoComplete="lname"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                required
                fullWidth
                label="Correo"
                autoComplete="email"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="pass"
                name="pass"
                required
                fullWidth
                type="password"
                label="Clave"
                autoComplete="current-password"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="phone"
                name="phone"
                required
                fullWidth
                label="Teléfono"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="entity"
                name="entity"
                required
                fullWidth
                label="Entidad"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="job"
                name="job"
                required
                fullWidth
                label="Puesto/Rol"
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="place"
                name="place"
                required
                fullWidth
                label="Ubicación"
                onChange={handleInputChange} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
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
