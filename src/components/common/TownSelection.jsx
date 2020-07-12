import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { TownsService } from "../../services/CommonService";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const TownSelection = ({ name, label, onChange, provinceId }) => {
  const classes = useStyles();
  const [selection, setSelection] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetch = () => {
    TownsService
      .get(provinceId)
      .then((data) => {
        setOptions(data.towns);
      })
      .catch(() => {});}
      if(provinceId) (fetch());
  }, [provinceId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setSelection(event.target.value);
    onChange(event);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={selection}
        onChange={handleChange}
      >
        <MenuItem value=''>
          <em>Sin selección</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

TownSelection.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  provinceId: PropTypes.number,
};

TownSelection.defaultProps = {
  name: 'town-selection',
  label: 'Localidad',
};

export default TownSelection;
