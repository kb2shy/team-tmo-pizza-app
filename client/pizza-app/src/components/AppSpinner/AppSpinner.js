import React from 'react';

import { Spinner } from 'react-bootstrap';

const AppSpinner = (props) => {
  return (
    <Spinner animation="border" style={{ width: '2rem', height: '2rem', flexShrink: 0 }} className="mx-1" />
  );
};

export default AppSpinner;
