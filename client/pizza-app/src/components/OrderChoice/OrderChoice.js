import React from 'react'
import PropTypes from 'prop-types'
import Title from '../Title/Title';
import BackButton from '../BackButton/BackButton'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import classes from './OrderChoice.module.css';
import { setMenu } from '../../actions/menu';

// OrderChoice: displayed for logged-in customer only, page 2
// - Title sub-component
// - History button
// - Create order button
// - Simple text
// - *BackButton component is displayed but rendered outside (don't render in component)
const OrderChoice = props => {

    const handleOrderHistory = (e) => {
        e.preventDefault();
        return props.setMenu(3);
    }

    const handleCreateOrder = (e) => {
        e.preventDefault();
        return props.setMenu(4);
    }

    return (
        
        <div className={classes.Body}>
            <BackButton></BackButton>
            <br></br>
            <div className={classes.Title}> title </div>
            <div className={classes.OrderChoice}>
                <h1>What would you like to do today?</h1>
                <br></br>
                <Button onClick={handleOrderHistory}>See my order History</Button>

                <Button onClick={handleCreateOrder}>Make a new order</Button>
            </div>
        </div>

    )
}

OrderChoice.propTypes = {

}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setMenu })(OrderChoice);

