import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import {ProvincesService} from '../../services/CommonService'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const ProvincesSelection = ({ name, label, onChange }) => {
  const classes = useStyles();
  const [province, setProvince] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    ProvincesService.get()
      .then((data) => {
        setOptions(data.map(obj => obj.name))
      })
      .catch(() => {})
  }, [])
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setProvince(event.target.value);
    onChange(event);
  }
  return (<FormControl className={classes.formControl}>
    <InputLabel id="select-label">{label}</InputLabel>
    <Select
      labelId={name}
      id={name}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      value={province}
      onChange={handleChange}
    >
      <MenuItem value="">
        <em>Sin selección</em>
      </MenuItem>
      {options.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>);
}

ProvincesSelection.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};

ProvincesSelection.defaultProps = {
  name: "province",
  label: "Provincia"
};

export default ProvincesSelection;
