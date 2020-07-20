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
import { Cancel, CheckCircle } from '@material-ui/icons';
import { AdminSuppliesRequestService } from '../../services/CommonService';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import StatusChip from '../common/StatusChip.jsx';
import AcceptRequestModal from './components/AcceptRequestModal.jsx';
import RejectRequestModal from './components/RejectRequestModal.jsx';
import InformativeDialog from '../common/InformativeDialog.jsx';

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

const AdminSupplyRequests = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [openRejectRequest, setOpenRejectRequest] = useState(false);
  const [openAcceptRequest, setOpenAcceptRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const refreshData = () => {
    AdminSuppliesRequestService.get(token)
      .then((response) => {
        setData(response);
      })
      .catch(() => {});
  };

  useEffect(refreshData, [token]);

  const reject = (id, reason) => {
    AdminSuppliesRequestService.reject(id, reason, token)
      .then(() => {
        setOpenRejectRequest(false);
        refreshData();
        setSuccessDialogOpen(true);
      })
      .catch(() => {
        setOpenRejectRequest(false);
        setErrorDialogOpen(true);
      });
  };

  const approve = (requestId, providerId) => {
    AdminSuppliesRequestService.approve(requestId, providerId, token)
      .then(() => {
        setOpenAcceptRequest(false);
        refreshData();
        setSuccessDialogOpen(true);
      })
      .catch(() => {
        setOpenAcceptRequest(false);
        setErrorDialogOpen(true);
      });
  };
  const f = n => String(`00${n}`).slice(-2);
  const formatDate = date => `${f(date.getUTCDate())}/${f(
    date.getUTCMonth() + 1,
  )}/${date.getUTCFullYear()}  ${f(date.getUTCHours())}:${f(
    date.getUTCMinutes(),
  )}`;

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
            Gestión de solicitudes
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table stickyHeader className={classes.table} size="small">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Fecha</StyledTableCell>
                <StyledTableCell>Insumo</StyledTableCell>
                <StyledTableCell align="right">Cantidad</StyledTableCell>
                <StyledTableCell align="left">Area</StyledTableCell>
                <StyledTableCell align="left">Persona</StyledTableCell>
                <StyledTableCell align="left">Rol</StyledTableCell>
                <StyledTableCell align="left">Estado</StyledTableCell>
                <StyledTableCell align="left">Acciones</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {formatDate(new Date(row.createdAt))}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.supply.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left"> {row.area.name} </StyledTableCell>
                  <StyledTableCell align="left"> <StatusChip statusName={row.status} /> </StyledTableCell>
                  <StyledTableCell align="left">{row.area.name}</StyledTableCell>
                  <StyledTableCell align="left">{`${row.user.firstName}${row.user.lastName}`}</StyledTableCell>
                  <StyledTableCell align="left">{row.user.job}</StyledTableCell>
                  <StyledTableCell align="left"><StatusChip statusName={row.status} /></StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip title="Aceptar">
                      <span>
                        <IconButton
                          aria-label="accept"
                          color="primary"
                          size="small"
                          disabled={!(row.status === 'Pending')}
                          onClick={() => {
                            setSelectedRequest(row);
                            setOpenAcceptRequest(true);
                          }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Rechazar">
                      <span>
                        <IconButton
                          aria-label="reject"
                          color="secondary"
                          size="small"
                          disabled={!(row.status === 'Pending')}
                          onClick={() => {
                            setSelectedRequest(row);
                            setOpenRejectRequest(true);
                          }}
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
      <AcceptRequestModal
        open={openAcceptRequest}
        model={selectedRequest}
        onClose={() => {
          refreshData();
          setOpenAcceptRequest(false);
        }}
        onAccept={(id, reason) => approve(id, reason)}
      />
      <RejectRequestModal
        open={openRejectRequest}
        model={selectedRequest}
        onClose={() => {
          refreshData();
          setOpenRejectRequest(false);
        }}
        onAccept={(id, reason) => reject(id, reason)}
      />
      <InformativeDialog
        title="Acción completada."
        text=""
        open={successDialogOpen}
        close={() => {
          setSuccessDialogOpen(false);
        }}
      />
      <InformativeDialog
        title="Ups"
        text="La acción no pudo ser completada."
        open={errorDialogOpen}
        close={() => {
          setErrorDialogOpen(false);
        }}
      />
    </>
  );
};

export default AdminSupplyRequests;
