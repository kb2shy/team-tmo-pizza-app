import React from 'react'
import {Table} from 'react-bootstrap'

const UserDetails = (props) => {
  
return(
    <Table borderless>
    <tbody>
      <tr id="Name">
        <td>Name : </td>
        <td>{props.first_name[0].toUpperCase() + props.first_name.slice(1) + ' ' + props.last_name[0].toUpperCase() + props.last_name.slice(1)}</td>
      </tr>
      <tr id="Email">
        <td>Email : </td>
        <td>{props.email}</td>
      </tr>
      <tr id="Phone">
        <td>Phone : </td>
        <td>{`${props.phone.substring(0, 3)}-${props.phone.substring(3, 6)}-${props.phone.substring(6)}`}</td>
      </tr>
    </tbody>
  </Table>
)
}

export default UserDetails;
