import React from 'react';
import PropTypes from 'prop-types';
import RJSBarcode from 'react-barcode';
import { connect } from 'react-redux';

const Barcode = ({ code }) => {
  return <div>{code && <RJSBarcode value={code} displayValue={false} />}</div>;
};

Barcode.propTypes = {
  code: PropTypes.string,
};

const mapStateToProps = (state) => ({
  code: state.order.code,
});

export default connect(mapStateToProps)(Barcode);
