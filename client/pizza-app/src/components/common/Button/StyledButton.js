import React from 'react';
import { Button } from 'react-bootstrap';
import './Button.css';

/**
 * A common Button element in the application
 *
 * @param {string} variant  formButton, navbarButton, backButton, createAccountButton, orderChoiceButton
 * @param {string} type submit, button
 * @param {string} disabled !isValid or other validation criterias
 * @param {string} onClick respective click handler
 */
const StyledButton = (props) => {
  return (
    <div>
      <Button
        variant={props.variant}
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </div>
  );
};
export default StyledButton;
