import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { previousMenu, setMenu } from '../../actions/menu';

import { Button } from 'react-bootstrap';

const BackButton = ({ step, previousMenu, setMenu, isAuthenticated }) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    //handles special case where guest is making pizza
    (step === 3 && isAuthenticated === false) ? setMenu(1) : previousMenu();
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setMenu, previousMenu })(BackButton);
