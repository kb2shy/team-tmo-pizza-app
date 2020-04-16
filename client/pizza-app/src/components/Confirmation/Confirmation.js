import React from 'react';
import { connect } from 'react-redux';
import { setMenu } from '../../actions/menu';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

// Confirmation: the confirmation page
// - Paragraph
// - Conditionally - text: want to save order
// - Create Account (CR: display for guest)
// - The Return to home button
const Confirmation = (props) => {
  const handleClickHome = (e) => {
    e.preventDefault();
    return props.setMenu(1);
  };

  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    return props.setMenu(6);
  };

  const saveOrder = () => {
    let userEmail = props.auth.isAuthenticated
      ? props.auth.user.email
      : props.guest.email;
    console.log(userEmail);

    if (!props.auth.isAuthenticated && userEmail) {
      return (
        <Row>
          <Col>
            <p>Want to save your order?</p>
            <p>Create an account today!</p>
            {/* <button onClick={handleClickCreateAccount}>Create Account</button> */}

            <StyledButton
              type="button"
              onClick={handleClickCreateAccount}
              text="Create Account"
              variant="createAccountButton"
            />
          </Col>
        </Row>
      );
    }
  };

  const userEmail = props.auth.isAuthenticated
    ? props.auth.user.email
    : props.guest.email;

  return (
    <Container
      data-test="component-Confirmation"
      style={{ textAlign: 'center' }}
    >
      <Row className="col-header">
        <Col>
          <StyledTitle text="Confirmation" className="basicTitle" />
        </Col>
      </Row>
      <Row>
        <Col className="col-email-message">
          <Alert variant="success">Success!</Alert>
          <p>An email has been sent to:</p>
          <p>{userEmail}</p>
          <StyledButton
            type="button"
            onClick={handleClickHome}
            text="Return to Home"
            variant="basicButton"
          />
          {/* <button onClick={handleClickHome}>
                        Return to Home
                    </button> */}
        </Col>
      </Row>
      <br />
      {saveOrder()}
    </Container>
  );
};

Confirmation.propTypes = {};

const mapStateToProps = (state) => ({
  // uncomment the below line and remove the dummy auth object
  auth: state.auth,
  // auth: {
  //     user: {
  //         email: `blahblahblah@email.com`,
  //     },
  //     isAuthenticated: false,
  // },
  // uncomment the next line below code and remove duplicate dummy code
  guest: state.guest,
  // guest: { email: "guest@email.com"},
});

export default connect(mapStateToProps, { setMenu })(Confirmation);
