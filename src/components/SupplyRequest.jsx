import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { SuppliesService, AreasService } from "../services/CommonService";
import { AuthContext } from "./../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
  },
}));

const SupplyRequest = () => {
  const classes = useStyles();

  const { token } = useContext(AuthContext);

  const [data, setData] = useState({ supply: "", area: "", amount: 0 });
  const [supplies, setSupplies] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedSupply, setSelectedSupply] = useState([]);
  const [postStatus, setPostStatus] = useState("");

  useEffect(() => {
    SuppliesService.get()
      .then((data) => {
        setSupplies(data);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    AreasService.get()
      .then((areas) => {
        setAreas(areas);
      })
      .catch(() => {});
  }, []);

  const handleSupplyChange = (event) => {
    setData({
      ...data,
      supply: event.target.value,
    });
    setSelectedSupply(event.target.value);
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    SuppliesService.post(data, token)
      .then(() => {
        setPostStatus('success');
      })
      .catch(() => {
        setPostStatus('error');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Solicitud de insumo
        </Typography>
        {(postStatus === 'success') ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert className={classes.alert} severity="success">
                Solicitud enviada satisfactoriamente
              </Alert>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {postStatus === 'error' ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert className={classes.alert} severity="error">
                Error inesperado al enviar la solicitud.
              </Alert>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="area"
                name="area"
                select
                label="Area"
                fullWidth
                value={data.area}
                onChange={handleInputChange}
                helperText="Por favor, seleccione un area"
              >
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area}>
                    {area.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="supply"
                name="supply"
                select
                label="Insumo"
                fullWidth
                value={data.supply}
                onChange={handleSupplyChange}
                helperText="Por favor, seleccione un insumo"
              >
                {supplies.map((supply) => (
                  <MenuItem key={supply.id} value={supply}>
                    {supply.name}
                    {supply.stock
                      ? `: ${supply.stock}disponible(s)`
                      : ": Sin límite"}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="amount"
                name="amount"
                type="number"
                inputProps={{
                  min: 1,
                  max: selectedSupply.stock ? selectedSupply.stock : 999999999,
                }}
                required
                fullWidth
                label="Cantidad"
                value={data.amount}
                onChange={handleInputChange}
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
  );
};

export default SupplyRequest;
