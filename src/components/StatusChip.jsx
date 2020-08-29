import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

const statusProps = {
  Approved: {
    label: 'Aprobado',
    style: {
      color: '#2e7d32',
      borderTopColor: '#2e7d32',
      borderRightColor: '#2e7d32',
      borderBottomColor: '#2e7d32',
      borderLeftColor: '#2e7d32',
    },
  },
  Pending: {
    label: 'Pendiente',
    style: {
      color: '#ff9800',
      borderTopColor: '#ff9800',
      borderRightColor: '#ff9800',
      borderBottomColor: '#ff9800',
      borderLeftColor: '#ff9800',
    },
  },
  Canceled: {
    label: 'Cancelado',
    style: {
      color: 'grey',
      borderTopColor: 'grey',
      borderRightColor: 'grey',
      borderBottomColor: 'grey',
      borderLeftColor: 'grey',
    },
  },
  Rejected: {
    label: 'Rechazada',
    style: {
      color: 'red',
      borderTopColor: 'red',
      borderRightColor: 'red',
      borderBottomColor: 'red',
      borderLeftColor: 'red',
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
