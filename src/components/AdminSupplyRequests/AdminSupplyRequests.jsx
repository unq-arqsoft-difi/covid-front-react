import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import {
  AdminSuppliesRequestService,
  AreasService,
  SuppliesService,
} from "../../services/CommonService";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { AuthContext } from "../../contexts/AuthContext";
import StatusChip from "./../common/StatusChip";
import AcceptRequestModal from "./components/AcceptRequestModal";
import RejectRequestModal from "./components/RejectRequestModal";
import InformativeDialog from "./../common/InformativeDialog";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
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
  const [supplies, setSupplies] = useState([]);
  const [areas, setAreas] = useState([]);

  const [openRejectRequest, setOpenRejectRequest] = useState(false);
  const [openAcceptRequest, setOpenAcceptRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const refreshData = () => {
    AdminSuppliesRequestService.get(token)
      .then((data) => {
        setData(data);
      })
      .catch(() => {});
  };

  useEffect(refreshData, [token]);

  const arrayToObject = (array) =>
    array.reduce((obj, item) => {
      obj[item["id"]] = item.name;
      return obj;
    }, {});

  useEffect(() => {
    SuppliesService.get()
      .then((supplies) => setSupplies(arrayToObject(supplies)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    AreasService.get()
      .then((areas) => setAreas(arrayToObject(areas)))
      .catch(() => {});
  }, []);

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

  const approve = (id, reason) => {
    AdminSuppliesRequestService.approve(id, reason, token)
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
                <StyledTableCell>Insumo</StyledTableCell>
                <StyledTableCell align="right">Cantidad</StyledTableCell>
                <StyledTableCell align="left">Area</StyledTableCell>
                <StyledTableCell align="left">Estado</StyledTableCell>
                <StyledTableCell align="left">Acciones</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {supplies[row.supplyId]}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left">
                    {areas[row.areaId]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <StatusChip statusName={row.status} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip title="Aceptar">
                      <IconButton
                        aria-label="accept"
                        color="primary"
                        size="small"
                        disabled={!(row.status === "Pending")}
                        onClick={() => {
                          setSelectedRequest(row);
                          setOpenAcceptRequest(true);
                        }}
                      >
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rechazar">
                      <IconButton
                        aria-label="reject"
                        color="secondary"
                        size="small"
                        disabled={!(row.status === "Pending")}
                        onClick={() => {
                          setSelectedRequest(row);
                          setOpenRejectRequest(true);
                        }}
                      >
                        <Cancel />
                      </IconButton>
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
