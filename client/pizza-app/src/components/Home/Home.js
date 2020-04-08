import React, { Component } from "react";
import { connect } from 'react-redux';
import { setMenu } from '../../actions/menu';

import PropTypes from "prop-types";

class Home extends Component {
  render() {
    return (
    <div data-test="component-Home">
      Home Component
    </div>);
  }
}

// const mapStateToProps = (state) => {

// }

Home.propTypes = {};

export default connect(null, { setMenu })(Home);
