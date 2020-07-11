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
  SuppliesService,
  AreasService,
  SuppliesRequestService,
} from "../../services/CommonService";
import { Cancel } from "@material-ui/icons";
import { AuthContext } from "../../contexts/AuthContext";
import InformativeDialog from "./components/InformativeDialog";

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

const SupplyRequests = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [areas, setAreas] = useState([]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [erroDialogOpen, setErrorDialogOpen] = useState(false);

  const statusTranslate = {
    Approved: "Aprobado",
    Pending: "Pendiente",
    Canceled: "Cancelado",
  };

  const refreshData = () => {
    SuppliesRequestService.get(token)
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
      .then((supplies) => {
        setSupplies(arrayToObject(supplies));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    AreasService.get()
      .then((areas) => {
        setAreas(arrayToObject(areas));
      })
      .catch(() => {});
  }, []);

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
                    {statusTranslate[row.status]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip title="Cancelar Solicitud">
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        size="small"
                        disabled={!(row.status === "Pending")}
                        onClick={() => {
                          cancelRequest(row.id);
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
      <InformativeDialog
        title="Solicitud cancelada"
        text="Su solicitud fue cancelada exitosamente."
        open={successDialogOpen}
        close={() => {
          setSuccessDialogOpen(false);
        }}
      />
      <InformativeDialog
        title="Solicitud no cancelada"
        text="Su no pudo ser cancelada."
        open={erroDialogOpen}
        close={() => {
          setErrorDialogOpen(false);
        }}
      />
    </>
  );
};

export default SupplyRequests;
