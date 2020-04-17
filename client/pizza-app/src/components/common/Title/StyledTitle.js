import React from 'react';
import './Title.css';

/**
 * A common title element in the application
 *
 * @param {string} text
 * @param {string} divClassName "titleBox" creates a red box around the title
 * @param {string} className "orderChoiceTitle", "basicTitle", "cursiveTitle", "homeTitleTop", "navbarTitle"
 * @param {string} paddingTop specify a custom padding-top value
 * @param {string} fontSize specify a custom font-size value
 */
const StyledTitle = (props) => {
  // the default padding-top property unless specified
  let applyPaddingTop = '';
  props.paddingTop === 'default'
    ? (applyPaddingTop = '10%')
    : (applyPaddingTop = props.paddingTop);

  // default cursive title font-size property unless specified
  let applyFontSize = '';
  props.fontSize === 'default'
    ? (applyFontSize = '2.5em')
    : (applyFontSize = props.fontSize);

  // default text color property unless specified
  // console.log(props.color);
  // let applyTextColor = '';
  // props.color === 'default'
  //   ? (applyTextColor = '#000')
  //   : (applyTextColor = props.color);

  return (
    <div className={props.divClassName}>
      <h1
        className={props.className}
        style={{ paddingTop: applyPaddingTop, fontSize: applyFontSize }}
      >
        {props.text}
      </h1>
    </div>
  );
};
export default StyledTitle;
