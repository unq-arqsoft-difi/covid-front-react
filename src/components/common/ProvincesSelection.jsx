import React from 'react'
import PropTypes from "prop-types";
import {
  TextField,
} from '@material-ui/core'

const ProvincesSelection = ({ name, label, onChange }) => {
  return (<TextField
    id={name}
    name={name}
    required
    fullWidth
    label={label}
    onChange={onChange} />);
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
