import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

const statusProps = {
  Approved: {
    label: 'Aprobado',
    style: {
      color: '#2e7d32',
      'border-top-color': '#2e7d32',
      'border-right-color': '#2e7d32',
      'border-bottom-color': '#2e7d32',
      'border-left-color': '#2e7d32',
    },
  },
  Pending: {
    label: 'Pendiente',
    style: {
      color: '#ff9800',
      'border-top-color': '#ff9800',
      'border-right-color': '#ff9800',
      'border-bottom-color': '#ff9800',
      'border-left-color': '#ff9800',
    },
  },
  Canceled: {
    label: 'Cancelado',
    style: {
      color: 'grey',
      'border-top-color': 'grey',
      'border-right-color': 'grey',
      'border-bottom-color': 'grey',
      'border-left-color': 'grey',
    },
  },
  Rejected: {
    label: 'Rechazada',
    style: {
      color: 'red',
      'border-top-color': 'red',
      'border-right-color': 'red',
      'border-bottom-color': 'red',
      'border-left-color': 'red',
    },
  },
};

const StatusChip = ({ statusName }) => {
  const status = statusProps[statusName];

  return (
    <Chip
      variant="outlined"
      size="small"
      label={status.label}
      style={status.style}
    />
  );
};

StatusChip.propTypes = {
  statusName: PropTypes.string.isRequired,
};

export default StatusChip;
