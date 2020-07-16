import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import SingleSelection from '../../common/SingleSelection';
import { ProvidersService } from '../../../services/CommonService';

const AcceptRequestModal = ({
  open, model, onClose, onAccept,
}) => {
  const [provider, setProvider] = useState([]);

  return (
    <Dialog onClose={onClose} aria-labelledby="accept-request" open={open}>
      <DialogTitle>Aceptar solicitud</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Indique un proveedor para asignar el pedido.
        </DialogContentText>
        <Grid container>
          <Grid item xs={12}>
            <SingleSelection
              name="supplyProvider"
              label="Proveedor asignado"
              service={ProvidersService}
              onChange={(event) => setProvider(event.target.value.id)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancelar
        </Button>
        <Button autoFocus onClick={() => onAccept(model.id, provider.id)} color="primary">
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
