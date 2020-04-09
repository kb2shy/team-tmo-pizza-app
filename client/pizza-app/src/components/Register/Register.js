import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { first_name: '', last_name: '', phone: '', email: '', password: '' };
    this.firstNameHandleChange = this.firstNameHandleChange.bind(this);
    this.lastNameHandleChange = this.lastNameHandleChange.bind(this);
    this.phoneHandleChange = this.phoneHandleChange.bind(this);
    this.emailHandleChange = this.emailHandleChange.bind(this);
    this.passwordHandleChange = this.passwordHandleChange.bind(this);
  }

  firstNameHandleChange(event) { this.setState({ first_name: event.target.value }); }
  lastNameHandleChange(event) { this.setState({ last_name: event.target.value }); }
  phoneHandleChange(event) { this.setState({ phone: event.target.value }); }
  emailHandleChange(event) { this.setState({ email: event.target.value }); }
  passwordHandleChange(event) { this.setState({ password: event.target.value }); }



  render() {
    return (
      <Mutation mutation={CREATE_CUSTOMER} onCompleted={data => {
        this.setState(prevState => ({
          todos: [...prevState.todos, data.addTodoList]
        }))
        this.inputElement.current.value = "";
        this.inputElement.current.focus();
      }}>
        {(createCustomer, { data }) => (
          <form>
            <label>
              First Name:
<textarea value={this.state.first_name} onChange={this.firstNameHandleChange} />
            </label>
            <br></br>
            <label>
              Last Name:
<textarea value={this.state.last_name} onChange={this.lastNameHandleChange} />
            </label>
            <br></br>
            <label>
              Phone
<textarea value={this.state.phone} onChange={this.phoneHandleChange} />
            </label>
            <br></br>
            <label>
              Email:
<textarea value={this.state.email} onChange={this.emailHandleChange} />
            </label>
            <br></br>
            <label>
              password:
<textarea value={this.state.password} onChange={this.passwordHandleChange} />
            </label>
            <br></br>

            <input type="submit" value="Submit" onClick={(e) => {
              e.preventDefault();
              createCustomer({
                variables: { first_name: this.state.first_name, last_name: this.state.last_name, phone: this.state.phone, email: this.state.email, password: this.state.password }
              })
            }} />
          </form>

        )}
      </Mutation>

    )
  }
}

Register.propTypes = {};

const CREATE_CUSTOMER = gql`
mutation  createCustomer($first_name: String!, $last_name: String!, $phone: String!, $email: String!,$password: String)
{
  createCustomer(first_name: $first_name, last_name: $last_name, phone: $phone, email: $email password: $password){
    customer_id
}
}
`;

export default Register;
