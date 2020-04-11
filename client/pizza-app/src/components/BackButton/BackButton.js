import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { previousMenu } from '../../actions/menu';

import { Button } from 'react-bootstrap';

const BackButton = ({ step, previousMenu }) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    previousMenu();
  };
  return step !== 1 ? (
    <div
      style={{
        position: 'absolute',
        left: '12px',
        marginTop: '12px',
        zIndex: 9999,
      }}
    >
      <Button
        onClick={handleClick}
        type="button"
        variant="primary"
        disabled={step === 1}
      >
        Back
      </Button>
    </div>
  ) : (
    <Fragment />
  );
};

BackButton.propTypes = {
  step: PropTypes.number.isRequired,
  previousMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.menu.step,
});

export default connect(mapStateToProps, { previousMenu })(BackButton);
