import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_PIZZA_INFO_BY_ORDER } from '../../config/gqlDefines';
import { setMenu } from '../../actions/menu';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import PropTypes from 'prop-types';

// importing PDF features and components
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Receipt from './Receipt/Receipt';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';
import AppSpinner from '../AppSpinner/AppSpinner';

// Confirmation: the confirmation page
// - Paragraph
// - Conditionally - text: want to save order
// - Create Account (CR: display for guest)
// - The Return to home button
const Confirmation = (props) => {

  const order_id = props.order.order_id;
  const { loading, error, data } = useQuery(GET_ALL_PIZZA_INFO_BY_ORDER, { variables: { order_id } });
  if (error) return <p>{error.message}</p>;
  if (loading) return <AppSpinner />;

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

  const getPDFLink = () => (
    <PDFDownloadLink
      document={<Receipt user={props.auth.isAuthenticated ? props.auth : props.guest}
        pizzas={data.getAllPizzaInfoByOrder}
        order={props.order} />}
      fileName={`PizzaOrder-${props.order.order_id}.pdf`}
      style={{ textDecoration: "none", color: "black" }}
    >
      {({ blob, url, loading, error }) => (
        loading ? 
          'Loading document...' : 
          <StyledButton
            type="button"
            text="Download receipt"
            variant="basicButton"
          >
            
          </StyledButton>
        )
      }
    </PDFDownloadLink>
  )

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
        </Col>
      </Row>
      <Row>
        <Col>
          <PDFViewer style={{ width: "100%" }}>
            <Receipt
              user={props.auth.isAuthenticated ? props.auth.user : props.guest}
              pizzas={data.getAllPizzaInfoByOrder}
              order={props.order}
            />
          </PDFViewer>
          {getPDFLink()}
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledButton
            type="button"
            onClick={handleClickHome}
            text="Return to Home"
            variant="basicButton"
          />
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
  order: state.order,
});

export default connect(mapStateToProps, { setMenu })(Confirmation);
