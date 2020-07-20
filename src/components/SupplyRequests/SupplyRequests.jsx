import React, { useState, useEffect, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { SuppliesRequestService } from '../../services/CommonService';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import InformativeDialog from '../common/InformativeDialog.jsx';
import StatusChip from '../common/StatusChip.jsx';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SupplyRequests = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [erroDialogOpen, setErrorDialogOpen] = useState(false);

  const refreshData = () => {
    SuppliesRequestService.get(token)
      .then(responseData => setData(responseData))
      .catch(() => {});
  };

  useEffect(refreshData, [token]);

  const cancelRequest = (id) => {
    SuppliesRequestService.delete(id, token)
      .then(() => {
        setSuccessDialogOpen(true);
        refreshData();
      })
      .catch(() => setErrorDialogOpen(true));
  };

  return (
    <>
      <Paper>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Solicitudes
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table stickyHeader className={classes.table} size="small">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Insumo</StyledTableCell>
                <StyledTableCell align="right">Cantidad</StyledTableCell>
                <StyledTableCell align="left">Area</StyledTableCell>
                <StyledTableCell align="left">Estado</StyledTableCell>
                <StyledTableCell align="left">Acciones</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">{row.supply.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left">{row.area.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    <StatusChip statusName={row.status} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip title={row.status === 'Pending' ? 'Cancelar Solicitud' : 'Ya no se puede Cancelar'}>
                      <span>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          size="small"
                          disabled={row.status !== 'Pending'}
                          onClick={() => cancelRequest(row.id)}
                        >
                          <Cancel />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <InformativeDialog
        title="Solicitud cancelada"
        text="Su solicitud fue cancelada exitosamente."
        open={successDialogOpen}
        close={() => setSuccessDialogOpen(false)}
      />
      <InformativeDialog
        title="Solicitud no cancelada"
        text="Su no pudo ser cancelada."
        open={erroDialogOpen}
        close={() => setErrorDialogOpen(false)}
      />
    </>
  );
};

export default SupplyRequests;
