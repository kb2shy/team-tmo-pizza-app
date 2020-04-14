import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { previousMenu, setMenu } from '../../actions/menu';
import { clearPizza }  from '../../actions/pizza';
import { Button } from 'react-bootstrap';

const BackButton = ({ step, previousMenu, prevStep, setMenu, clearPizza}) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    //clear current pizza
    // clearPizza();
    //when on create pizza, skip order history page
     // (step === 3) ? setMenu(1) : previousMenu();
     console.log(prevStep);
     previousMenu();
  };
  // don't display the buttons on home and confirmation pages
  return step !== 1 && step !== 5 ? (
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
  isAuthenticated: state.auth.isAuthenticated,
  prevStep: state.menu.prevStep
});

export default connect(mapStateToProps, { setMenu, previousMenu, clearPizza })(BackButton);
