import React, { Component } from 'react'
import { UserConsumer } from './UserContext'

class ComponentC extends Component {
  render() {
    return (
        <UserConsumer>
            {named =>{
                return <div>Hello {named}</div>
            }}
        </UserConsumer>
    )
  }
}

export default ComponentC
