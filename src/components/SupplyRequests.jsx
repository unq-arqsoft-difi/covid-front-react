import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import {
  SuppliesService,
  AreasService,
  SuppliesRequestService,
} from "../services/CommonService";
import { AuthContext } from "./../contexts/AuthContext";

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
  const statusTranslate = {
    Approved: "Aprobado",
    Pending: "Pendiente",
    Canceled: "Cancelado",
  };

  useEffect(() => {
    SuppliesRequestService.get(token)
      .then((data) => {
        setData(data);
      })
      .catch(() => {});
  }, [token]);

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

  return (
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
              <StyledTableCell align="right">Area</StyledTableCell>
              <StyledTableCell align="right">Estado</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {supplies[row.supplyId]}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell align="right">
                  {areas[row.areaId]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {statusTranslate[row.status]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SupplyRequests;
