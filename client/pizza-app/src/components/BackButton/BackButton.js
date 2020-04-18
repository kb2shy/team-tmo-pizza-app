import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { previousMenu, setMenu } from '../../actions/menu';
import { clearPizza } from '../../actions/pizza';
import { Modal } from 'react-bootstrap';
import StyledButton from '../common/Button/StyledButton';
import './BackButton.css';

const BackButton = ({ step, previousMenu, prevStep, setMenu, clearPizza }) => {
  /*
    When the user clicks the "back" button on the create pizza page
    a modal pop-up appears with options to proceed or stay on the page
  */
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const handleGoToHome = () => {
    handleCloseAlert();
    clearPizza();
    previousMenu();
  };

  const renderModal = (
    <div className="alertStyle">
      <Modal show={showAlert} onHide={handleCloseAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Warning! Your order is incomplete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Going to the home page will cause you to lose your pizza order. Do
            you want to proceed?{' '}
          </p>
          <div className="alertStyle">
            <StyledButton
              variant="basicButton"
              text="Proceed"
              onClick={handleGoToHome}
            />
            <StyledButton
              variant="basicButton"
              text="Continue Order"
              onClick={handleCloseAlert}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );

  const handleClick = (evt) => {
    evt.preventDefault();
    //clear current pizza
    // clearPizza();
    //when on create pizza, skip order history page
    // (step === 3) ? setMenu(1) : previousMenu();

    // Incomplete order on the create pizza page
    step === 3 ? handleShowAlert() : previousMenu();
  };

  // don't display the buttons on home, cart, and confirmation pages
  return step !== 1 && step !== 4 && step !== 5 ? (
    <div className="backButtonPositioning">
      <StyledButton
        type="button"
        variant="backButton"
        disabled={step === 1}
        onClick={handleClick}
        text="Back"
      />
      {renderModal}
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
  prevStep: state.menu.prevStep,
});

export default connect(mapStateToProps, { setMenu, previousMenu, clearPizza })(
  BackButton
);
