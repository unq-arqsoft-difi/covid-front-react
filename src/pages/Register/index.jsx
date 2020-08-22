import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import UsersService from '../../services/UsersService';
import { InstitutionsService, ProvincesService, TownsService } from '../../services/CommonService';

const useStyles = makeStyles(theme => ({
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

  const [institutions, setInstitutions] = useState([]);
  const [institutionValue, setInstitutionValue] = useState('');
  const [institutionInputValue, setInstitutionInputValue] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [provinceValue, setProvinceValue] = useState('');
  const [provinceInputValue, setProvinceInputValue] = useState('');

  const [towns, setTowns] = useState([]);
  const [townValue, setTownValue] = useState('');
  const [townInputValue, setTownInputValue] = useState('');

  const [emailValue, setEmail] = useState('');
  const [firstNameValue, setFirstName] = useState('');
  const [jobValue, setJob] = useState('');
  const [lastNameValue, setLastName] = useState('');
  const [passValue, setPass] = useState('');
  const [phoneValue, setPhone] = useState('');

  const [requestStatus, setRequestStatus] = useState({
    status: null,
    description: [],
  });

  const setError = error => setRequestStatus({ status: 'error', description: error });

  useEffect(() => {
    InstitutionsService.get().then(data => setInstitutions(data)).catch(setError);
  }, []);

  useEffect(() => {
    ProvincesService.get().then(data => setProvinces(data)).catch(setError);
  }, []);

  const fetchTownsFrom = async (province) => {
    if (province && province.id) {
      await TownsService.get(province.id).then(data => setTowns(data.towns)).catch(setError);
      return;
    }

    setTowns([]);
    setTownValue('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: phoneValue,
      job: jobValue,
      pass: passValue,
      institutionId: institutionValue.id,
      provinceId: provinceValue.id,
      townId: townValue.id,
    };
    UsersService.post(data)
      .then(() => history.push('/login'))
      .catch(body => setError(body.errors));
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Registrarse</Typography>

        {requestStatus.status === 'error' && (
          <Alert className={classes.alert} severity="error">
            <List>
              {Array.isArray(requestStatus.description)
                ? requestStatus.description.map((item, index) => (
                  <ListItem key={index.toString()}>{item}</ListItem>
                ))
                : <ListItem>{requestStatus.description.toString()}</ListItem>
              }
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
                value={firstNameValue}
                onChange={event => setFirstName(event.target.value)}
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
                value={lastNameValue}
                onChange={event => setLastName(event.target.value)}
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
                value={emailValue}
                onChange={event => setEmail(event.target.value)}
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
                value={passValue}
                onChange={event => setPass(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="phone"
                name="phone"
                required
                fullWidth
                label="Teléfono"
                value={phoneValue}
                onChange={event => setPhone(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                value={institutionValue}
                onChange={(event, newValue) => setInstitutionValue(newValue)}
                inputValue={institutionInputValue}
                onInputChange={(event, newInputValue) => setInstitutionInputValue(newInputValue)}
                id="institution"
                options={institutions}
                getOptionLabel={item => item.name || ''}
                fullWidth
                renderInput={params => <TextField {...params} label="Institución" />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="job"
                name="job"
                required
                fullWidth
                label="Puesto/Rol"
                value={jobValue}
                onChange={event => setJob(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={provinceValue}
                onChange={(event, newValue) => {
                  setProvinceValue(newValue);
                  fetchTownsFrom(newValue);
                }}
                inputValue={provinceInputValue}
                onInputChange={(event, newInputValue) => setProvinceInputValue(newInputValue)}
                id="province"
                options={provinces}
                getOptionLabel={item => item.name || ''}
                fullWidth
                renderInput={params => <TextField {...params} label="Provincia" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Autocomplete
                value={townValue}
                onChange={(event, newValue) => setTownValue(newValue)}
                inputValue={townInputValue}
                onInputChange={(event, newInputValue) => setTownInputValue(newInputValue)}
                id="town"
                options={towns}
                getOptionLabel={item => item.name || ''}
                fullWidth
                renderInput={params => <TextField {...params} label="Localidad" />}
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
