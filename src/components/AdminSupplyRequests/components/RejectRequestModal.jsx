import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from '@material-ui/core';

const RejectRequestModal = ({
  open, model, onClose, onAccept,
}) => {
  const [rejectReason, setRejectReason] = useState('');

  return (
    <Dialog onClose={onClose} aria-labelledby="reject-request" open={open}>
      <DialogTitle>Rechazar solicitud</DialogTitle>
      <DialogContent>
        <DialogContentText>Indique el motivo del rechazo</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="reject-rReason"
          name="reject-rReason"
          label="Motivo del rechazo"
          type="string"
          onChange={(event) => setRejectReason(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancelar
        </Button>
        <Button
          autoFocus
          onClick={() => onAccept(model.id, rejectReason)}
          color="primary"
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RejectRequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  model: PropTypes.PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default RejectRequestModal;
