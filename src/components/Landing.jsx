import React from "react";
import { Grid, Box, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subTitleContainer: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  },
  responsiveImage: {
    position: "relative",
    "max-width": "100%",
  },
  responsiveImage__image: {
    position: "relative",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <Box bgcolor="primary" className={classes.subTitleContainer}>
      <Grid container spacing={2} wrap>
        <Grid item xs={12} wrap>
          <Typography variant="h4">Sistema de insumos médicos</Typography>
          <div className="responsive-image">
            <img
              className={classes.responsiveImage__image}
              alt="Landing"
              src={"https://unsplash.com/photos/sCqkCcYmtlM/download?force=false&w=1920"}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
