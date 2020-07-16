import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import UsersService from '../services/UsersService';
import SingleSelection from './common/SingleSelection';
import TownSelection from './common/TownSelection';
import { InstitutionsService, ProvincesService } from '../services/CommonService';

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
  alert: {
    width: '100%',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const emptyData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    job: '',
    pass: '',
    institutionId: '',
    provinceId: '',
    townId: '',
  };
  const [data, setData] = useState(emptyData);
  const [requestStatus, setRequestStatus] = useState({
    status: null,
    description: [],
  });
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    UsersService.post(data)
      .then(() => {
        history.push('/login');
      })
      .catch((body) => {
        setRequestStatus({ status: 'error', description: body.errors });
      });
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
        {requestStatus.status === 'error' && (
          <Alert className={classes.alert} severity="error">
            <List>
              {requestStatus.description.map((item, index) => (
                <ListItem key={index.toString()}>{item}</ListItem>
              ))}
            </List>
          </Alert>
        )}
        {requestStatus === 'success' && (
          <Alert className={classes.alert} severity="success">
            This is a success alert — check it out!
          </Alert>
        )}
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
                value={data.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                required
                fullWidth
                label="Apellido"
                autoComplete="lname"
                value={data.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                required
                fullWidth
                label="Correo"
                autoComplete="email"
                value={data.email}
                onChange={handleInputChange}
              />
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
                value={data.pass}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="phone"
                name="phone"
                required
                fullWidth
                label="Teléfono"
                value={data.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SingleSelection
                name="institutionId"
                label="Institución"
                service={InstitutionsService}
                onChange={(event) => {
                  setData({
                    ...data,
                    institutionId: event.target.value.id,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="job"
                name="job"
                required
                fullWidth
                label="Puesto/Rol"
                value={data.job}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SingleSelection
                name="provinceId"
                label="Provincia"
                service={ProvincesService}
                onChange={(event) => {
                  setData({
                    ...data,
                    provinceId: event.target.value.id,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TownSelection
                onChange={(event) => {
                  setData({
                    ...data,
                    townId: event.target.value.id,
                  });
                }}
                provinceId={data.provinceId}
              />
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
