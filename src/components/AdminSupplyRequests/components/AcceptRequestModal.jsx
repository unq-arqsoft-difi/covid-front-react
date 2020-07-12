import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@material-ui/core";



const AcceptRequestModal = ({ open, model, onClose, onAccept }) => {

  return (
    <Dialog onClose={onClose} aria-labelledby="accept-request" open={open}>
      <DialogTitle>Aceptar solicitud</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Indique un proveedor para asignar el pedido.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="supplyProvider"
          name="supplyProvider"
          label="Proveedor"
          type="string"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancelar
        </Button>
        <Button autoFocus onClick={() => onAccept(model.id)} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AcceptRequestModal.propTypes = {
  open: PropTypes.bool,
  model: PropTypes.object,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
};

export default AcceptRequestModal;
