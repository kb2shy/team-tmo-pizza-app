import React from 'react';
import { Button } from 'react-bootstrap';
import './Button.css';

/**
 * A common Button element in the application
 *
 * @param {string} variant  basicButton, navbarButton, backButton, createAccountButton, orderChoiceButton
 * @param {string} type submit, button
 * @param {string} disabled !isValid or other validation criterias
 * @param {string} onClick respective click handler
 * @param {string} text button text
 * @param {string} size button size. Options: size="lg", size="sm"
 */
const StyledButton = (props) => {
  return (
    <div>
      <Button
        variant={props.variant}
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        size={props.size}
      >
        {props.text}
      </Button>
    </div>
  );
};
export default StyledButton;
