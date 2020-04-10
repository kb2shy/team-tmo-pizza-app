import React from 'react';
import { connect } from 'react-redux';
import { setMenu } from '../../actions/menu';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'

// Confirmation: the confirmation page
// - Paragraph
// - Conditionally - text: want to save order
// - Create Account (CR: display for guest)
// - The Return to home button
const Confirmation = props => {
    const handleClickHome = (e) => {
        e.preventDefault();
        return props.setMenu(1);
    }

    const saveOrder = () => {
        if (!props.auth.isAuthenticated) {
            return (
                <Row>
                    <Col>
                        <p>Want to save your order?</p>
                        <p>Create an account today!</p>
                        <button onClick={(e) => props.setMenu(7)}>Create Account</button>
                    </Col>
                </Row>
            )
        }
    }

    return (
        <Container data-test="component-Confirmation" style={{ textAlign: "center"}}>
            <Row className="col-header">
                <Col>
                    <h3>CONFIRMATION</h3>
                </Col>
            </Row>
            <Row>
                <Col className="col-email-message" >
                    <Alert variant="success">Success!</Alert>
                    <p>An email has been sent to:</p>
                    <p>{props.auth.user.email}</p>
                    <button onClick={handleClickHome}>
                        Return to Home
                    </button>
                </Col>
            </Row>
            <br />
            {saveOrder()}
        </Container>
    )
}

Confirmation.propTypes = {

}

const mapStateToProps = (state) => ({
    // uncomment the below line and remove the dummy auth object
    // auth: state.auth,
    auth: { 
        user: { 
            email: `blahblahblah@email.com`,
        },
        isAuthenticated: false,
    },
})


export default connect(mapStateToProps, { setMenu })(Confirmation);
