import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_ORDER_INFO_BY_ORDER_ID } from '../../config/gqlDefines';
import { setMenu } from '../../actions/menu';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import './Confirmation.css'
import PropTypes from 'prop-types';

// importing PDF features and components
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Receipt from './Receipt/Receipt';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';
import AppSpinner from '../AppSpinner/AppSpinner';
import { clearOrder } from '../../actions/order';

// Confirmation: the confirmation page
// - Paragraph
// - Conditionally - text: want to save order
// - Create Account (CR: display for guest)
// - The Return to home button
const Confirmation = ({ order, setMenu, clearOrder }) => {

  const order_id = order.order_id || 1;
  const { loading, error, data } = useQuery(GET_ALL_ORDER_INFO_BY_ORDER_ID, { variables: { order_id } });

  if (error) return <p>{error.message}</p>;
  if (loading) return <AppSpinner />;

  const {
    customer,
    address,
    created_at,
    delivery,
    pizzas,
  } = data.getAllOrderInfoByOrderId;

  /**
   * Function to return user to home page
   * @param {event} e
   * @returns {Function} setMenu
   */
  const handleClickHome = (e) => {
    e.preventDefault();
    clearOrder();
    return setMenu(1);
  };

  /**
   * Function to route user to Register page
   * @param {event} e
   * @returns {Function} setMenu
   */
  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    return setMenu(6);
  };

  /**
   * Function that returns conditional JSX if ordering pizza as a guest
   * @returns {object} Option to register component
   */
  const saveOrder = () => {
    if (!customer.registered) {
      return (
        <Row>
          <Col className='col-create-account'>
            <p>Want to save your order?</p>
            <p>Create an account today!</p>
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

  /**
   * Function that displays either loading message or download button for PDF document
   * @returns {object} PDF link displayed as styled button
   */
  const getPDFLink = () => {
     return (
    <PDFDownloadLink
      document={<Receipt user={customer}
      pizzas={pizzas}
      order={order_id} />}
      delivery={delivery}
      fileName={`PizzaOrder-${order_id}.pdf`}
      style={{ textDecoration: "none", color: "black" }}
    >
      {({ blob, url, loading, error }) => (
        loading ?
          'Loading document...' :
          <StyledButton
            type="button"
            text="Download receipt"
            variant="basicButton"
          />
        )
      }
    </PDFDownloadLink>
  )}

  return (
    <Container
      data-test="component-Confirmation"
      style={{ textAlign: 'center', flexWrap:'wrap' }}
    >
      <Row className="col-header">
        <Col>
          <StyledTitle text="Confirmation" className="basicTitle" />
        </Col>
      </Row>

      <Row>
        <Col className="col-email-message">
          <Alert variant="success">Success!</Alert>
          <p>Thank you, {customer.first_name} {customer.last_name}, for placing an order with us!</p>
          <p>An email has been sent to: {customer.email}</p>
        </Col>
      </Row>

      <Row>
        <Col className='receiptCol'>
          <PDFViewer style={{ width: "100%", height:"100%"}}>
            <Receipt
              user={customer}
              pizzas={pizzas}
              orderId={order_id}
              orderDate={created_at}
              delivery={delivery}
            />
          </PDFViewer>
          {getPDFLink()}
        </Col>
        <Col>
          {saveOrder()}
          <Row>
            <Col className='returnHomeCol'>
              <StyledButton
                type="button"
                onClick={handleClickHome}
                text="Return to Home"
                variant="returnHome"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

Confirmation.propTypes = {
  order: PropTypes.object.isRequired,
  setMenu: PropTypes.func.isRequired,
  clearOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { setMenu, clearOrder })(Confirmation);
