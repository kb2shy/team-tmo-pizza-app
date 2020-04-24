import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import { setMenu } from '../../actions/menu';

// Custom Styling
import StyledButton from '../common/Button/StyledButton';
import StyledTitle from '../common/Title/StyledTitle';

const MenuChoice = (props) => {
    
    // Change to custom order
    const handleCustomOrder = (e) => {
        e.preventDefault();
        return props.setMenu(3);
    };

    // Change to specialty order
    const handleSpecialtyOrder = (e) => {
        e.preventDefault();
        return props.setMenu(7);
    }

  return (
    <Container fluid style={{ marginTop: '3em' }}>
      <StyledTitle
        text="Menu"
        className="basicTitle"
      />
      <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '5em' }}>What would you like to order today?</h3>

        <StyledButton
          type="button"
          onClick={handleCustomOrder}
          text="Custom Pizzas"
          variant="basicButton"
        />

        <StyledButton
          type="button"
          onClick={handleSpecialtyOrder}
          text="Specialty Pizzas"
          variant="basicButton"
        />
      </div>
    </Container>
  );
};


export default connect(undefined, {
    setMenu
  })(MenuChoice);