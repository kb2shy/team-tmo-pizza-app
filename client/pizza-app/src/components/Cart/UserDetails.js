import React from 'react'
import {Table} from 'react-bootstrap'

const UserDetails = (props) => {
return(
    <Table borderless>
    <tbody>
      <tr id="Name">
        <td>Name : </td>
        <td>{props.first_name + ' ' + props.last_name}</td>
      </tr>
      <tr id="Email">
        <td>Email : </td>
        <td>{props.email}</td>
      </tr>
      <tr id="Phone">
        <td>Phone : </td>
        <td>{props.phone}</td>
      </tr>
    </tbody>
  </Table>
)
}

export default UserDetails;
