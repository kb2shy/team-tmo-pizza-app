import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

// Actions
import { previousMenu, setMenu } from '../../actions/menu';
import { clearPizza, setEditPizzaFlag } from '../../actions/pizza';
import { addPizza } from '../../actions/pizzas';

// Helper Component, Styling
import StyledButton from '../common/Button/StyledButton';
import WarningModal from './WarningModal';
import './BackButton.css';

const BackButton = ({
  step,
  prevSteps,
  previousMenu,
  setMenu,
  clearPizza,
  pizza,
  pizzas,
  addPizza,
}) => {
  /*
    When the user clicks the "back" button on the create pizza page
    a modal pop-up appears with options to proceed or stay on the page
  */
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const handleGoToPreviousPage = () => {
    handleCloseAlert();
    clearPizza();
    previousMenu();
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    const currentPizza = pizza;

    // on create pizza page
    if (step === 3) {

      // creating a pizza, user views a pop-up
      if (!currentPizza.editPizzaFlag) 
        handleShowAlert();

      // editing a pizza, no changes made, no pop-up
      else if (currentPizza.editPizzaFlag) {
        addPizza(currentPizza);
        clearPizza();
        currentPizza.editPizzaFlag = !currentPizza.editPizzaFlag;
        previousMenu();
      }
    } else {
      previousMenu();
    }
  };

  // don't display the buttons on home, cart, and confirmation pages
  return step !== 1 && step !== 4 && step !== 5 ? (
    <div className="backButtonPositioning">
      <StyledButton
        type="button"
        variant="backButton"
        disabled={step === 1 || prevSteps.length === 0}
        onClick={handleClick}
        text={pizza.editPizzaFlag ? 'Cancel' : 'Back'}
      />
      {/* {renderModal} */}
      <WarningModal
        showAlert={showAlert}
        handleGoToPreviousPage={handleGoToPreviousPage}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  ) : (
    <Fragment />
  );
};

BackButton.propTypes = {
  step: PropTypes.number.isRequired,
  prevSteps: PropTypes.array.isRequired,
  previousMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.menu.step,
  prevSteps: state.menu.prevSteps,
  isAuthenticated: state.auth.isAuthenticated,
  pizzas: state.pizzas,
  pizza: state.pizza,
});

export default connect(mapStateToProps, {
  setMenu,
  previousMenu,
  clearPizza,
  setEditPizzaFlag,
  addPizza,
})(BackButton);
