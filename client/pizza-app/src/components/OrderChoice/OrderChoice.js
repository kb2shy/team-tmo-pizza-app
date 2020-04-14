import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Title from '../Title/Title';
import BackButton from '../BackButton/BackButton'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import classes from './OrderChoice.module.css';
import { setMenu } from '../../actions/menu';
import { clearUserHistory, getUserHistory } from '../../actions/database';
import { clearPizza }  from '../../actions/pizza';

// OrderChoice: displayed for logged-in customer only, page 2
// - Title sub-component
// - History button
// - Create order button
// - Simple text
// - *BackButton component is displayed but rendered outside (don't render in component)
const OrderChoice = props => {

    //Gets user history data
    useEffect(() => {
        props.clearUserHistory();
        if(props.user !== null) {
            props.getUserHistory(props.user.customer_id);
        }
    }, [props.user]);

    const handleOrderHistory = (e) => {
        e.preventDefault();
        return props.setMenu(2, props.step);
    }

    const handleCreateOrder = (e) => {
        e.preventDefault();
        props.clearPizza();
        console.log(props.step);
        return props.setMenu(3, props.step);
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
    isAuthenticated: state.auth.isAuthenticated,
    step: state.menu.step
});

export default connect(mapStateToProps, { setMenu, clearUserHistory, getUserHistory, clearPizza })(OrderChoice);

