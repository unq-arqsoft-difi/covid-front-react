import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { ProvidersService } from '../../../services/CommonService';

const AcceptRequestModal = ({
  open, model, onClose, onAccept,
}) => {
  const [providers, setProviders] = useState([]);
  const [providerValue, setProviderValue] = useState('');
  const [providerInputValue, setProviderInputValue] = useState('');

  useEffect(() => {
    ProvidersService.get().then(data => setProviders(data));
  }, []);

  return (
    <Dialog onClose={onClose} aria-labelledby="accept-request" open={open}>
      <DialogTitle>Aceptar solicitud</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Indique un proveedor para asignar el pedido.
        </DialogContentText>
        <Grid container>
          <Grid item xs={12}>
          <Autocomplete
            value={providerValue}
            onChange={(event, newValue) => setProviderValue(newValue)}
            inputValue={providerInputValue}
            onInputChange={(event, newInputValue) => setProviderInputValue(newInputValue)}
            id="provider"
            options={providers}
            getOptionLabel={item => item.name || ''}
            fullWidth
            renderInput={params => <TextField {...params} label="Proveedor Asignado" />}
          />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancelar
        </Button>
        <Button autoFocus onClick={() => onAccept(model.id, providerValue.id)} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AcceptRequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  model: PropTypes.PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default AcceptRequestModal;
