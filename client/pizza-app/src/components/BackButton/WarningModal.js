import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import StyledButton from '../common/Button/StyledButton';

const WarningModal = (props) => {
  return (
    <div className="alertStyle">
      <Modal show={props.showAlert} onHide={props.handleCloseAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Warning! Your order is incomplete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Going to the previous page will cause you to lose your pizza order.
            Do you want to proceed?{' '}
          </p>
          <div className="alertStyle">
            <StyledButton
              variant="basicButton"
              text="Proceed"
              onClick={props.handleGoToPreviousPage}
            />
            <StyledButton
              variant="basicButton"
              text="Continue Order"
              onClick={props.handleCloseAlert}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(WarningModal);
