import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
const Example = () => {

    //graphql query, wrapped in outer function that should be used with useMutation
    const CREATE_CUSTOMER = gql`
    mutation
        createCustomer(
            $first_name: String!
            $last_name: String!
            $phone: String!
            $email: String!
            $password: String
        ){
            createCustomer(
                first_name:  $first_name
                last_name: $last_name
                phone: $phone
                email: $email
                password: $password
            ){
                first_name
            }
        }
    `

    //apollo mutation react hook
    const [createCustomer] = useMutation(CREATE_CUSTOMER)
    const [name, setname] = useState()

    const handleClick = async () => {
        //make actual mutation request
        const newCustomer = await createCustomer({
            variables: {
                first_name: "abigail",
                last_name: "Rivera",
                email: "anton@email.com",
                phone: "4656666649",
                password: "password"
            }
        })
        setname(newCustomer.data.createCustomer.first_name)
    }

    return (
        <div>
            Example Component connected to db
            <button onClick={handleClick}>click here</button>
            <p>{name}</p>
        </div>
    );

}

export default Example;