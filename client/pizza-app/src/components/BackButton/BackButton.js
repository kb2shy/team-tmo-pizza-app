import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { previousMenu } from '../../actions/menu';

import { Button } from 'react-bootstrap';

const BackButton = ({ step, previousMenu }) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    previousMenu();
  };
  return (
    <div>
      {step !== 0 && (
        <div style={{ position: 'absolute', left: '12px', marginTop: '12px' }}>
          <Button onClick={handleClick} type="button" variant="primary">
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

BackButton.propTypes = {
  step: PropTypes.number.isRequired,
  previousMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.menu.step,
});

export default connect(mapStateToProps, { previousMenu })(BackButton);
