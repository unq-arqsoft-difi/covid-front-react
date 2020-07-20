import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { SuppliesService, AreasService, SuppliesRequestService } from '../services/CommonService';
import { AuthContext } from '../contexts/AuthContext.jsx';
import InformativeDialog from './common/InformativeDialog.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

const SupplyRequest = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  const [areas, setAreas] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [amountValue, setAmountValue] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [areaInputValue, setAreaInputValue] = useState('');
  const [supplyValue, setSupplyValue] = useState('');
  const [supplyInputValue, setSupplyInputValue] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [errorDialogStatus, setErrorDialogStatus] = useState({ open: false, text: '' });

  const setError = (error) => {
    setErrorDialogStatus({ open: true, text: `Error: ${error}` });
  };

  useEffect(() => {
    AreasService.get().then(data => setAreas(data)).catch(setError);
  }, []);

  useEffect(() => {
    SuppliesService.get().then(data => setSupplies(data)).catch(setError);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { supply: supplyValue, area: areaValue, amount: amountValue };
    SuppliesRequestService.post(data, token)
      .then(() => {
        setPostStatus('success');
        setAreaValue('');
        setSupplyValue('');
        setAmountValue('');
      })
      .catch(setError);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">Solicitud de insumo</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {postStatus === 'success' ? (
                  <Alert className={classes.alert} severity="success">
                    Solicitud enviada satisfactoriamente
                  </Alert>
                ) : (<></>)}
                <Autocomplete
                  value={areaValue}
                  onChange={(event, newValue) => setAreaValue(newValue)}
                  inputValue={areaInputValue}
                  onInputChange={(event, newInputValue) => setAreaInputValue(newInputValue)}
                  id="area"
                  options={areas}
                  getOptionLabel={area => area.name || ''}
                  required
                  fullWidth
                  renderInput={params => <TextField {...params} label="Insumos" margin="normal" />}
                />
                <Autocomplete
                  value={supplyValue}
                  onChange={(event, newValue) => setSupplyValue(newValue)}
                  inputValue={supplyInputValue}
                  onInputChange={(event, newInputValue) => setSupplyInputValue(newInputValue)}
                  id="supply"
                  options={supplies}
                  getOptionLabel={supply => supply.name || ''}
                  required
                  fullWidth
                  renderInput={params => <TextField {...params} label="Insumos" margin="normal" />}
                />
                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  inputProps={{ min: 1, max: 1000 }}
                  required
                  fullWidth
                  label="Cantidad"
                  value={amountValue}
                  onChange={(event, newValue) => setAmountValue(newValue)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <InformativeDialog
        title="Ups"
        text={errorDialogStatus.text}
        open={errorDialogStatus.open}
        close={() => {
          setErrorDialogStatus({ open: false, text: '' });
        }}
      />
    </>
  );
};

export default SupplyRequest;
