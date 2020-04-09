<<<<<<< abigail
import React, { Component } from 'react';
import { connect } from 'react-redux';
//this example is for how to use graphql to persist data to backend
//import Example from './example'
=======
<<<<<<< master
=======

>>>>>>> local
import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "react-bootstrap";

import Home from "../Home/Home";
<<<<<<< master
=======

//this example is for how to use graphql to persist data to backend
//import Example from './example'
>>>>>>> local
>>>>>>> local

class App extends Component {
  render() {
    return (
<<<<<<< abigail
      //code to see example connection to send data to db
      // <div className="App">
      //   App Component
      //   <Example></Example>
      // </div>
=======
      <Container>
<<<<<<< master
=======
      {/* code to see example connection to send data to db
        <Example></Example> */}
>>>>>>> local
        <div>App Component</div>
        {/* Render Home, Main, or a preferred component based on the step of the menu */}
        {this.getViewState()}
      </Container>
>>>>>>> local
    );
  }
}

export default App;
