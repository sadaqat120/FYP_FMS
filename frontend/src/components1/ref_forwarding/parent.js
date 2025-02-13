import React, { Component } from 'react'
import  Child from './child'
class Parent extends Component {
    constructor(props) {
      super(props)
      this.componentRef= React.createRef()
    }

    clickHandler =()=>{
        this.componentRef.current.focus()
    }

  render() {
    return (
      <div>
        <Child ref={this.componentRef}/>
        <button onClick={this.clickHandler}>click to focus</button>
      </div>
    )
  }
}

export default Parent
