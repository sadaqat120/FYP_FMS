import React, { Component } from 'react'
import ComponentC from './ComponentC'
import UserContext from './UserContext'

class ComponentB extends Component {
  
static contextType = UserContext

// This is also the method to make and consume the context,
// but it have also the two limitations: 1st is that it is only
// available in the class component and not in the functional
// component, and the 2nd is that it only one time uses of the
// provider and the provider context. (see by your own on that..)

  render() {
    return (
      <div>
        <h4>This is at the ComponentB: {this.context}</h4>
        <ComponentC/>
      </div>
    )
  }
}

export default ComponentB
