import React, { Component } from 'react'
import Inputing from './inputing'
class focusInput extends Component {
    constructor(props) {
      super(props)
      this.componentRef= React.createRef()
    }

    clickHandler =()=>{
        this.componentRef.current.focusing_on_input()
    }

  render() {
    return (
      <div>
        <Inputing ref={this.componentRef}/>
        <button onClick={this.clickHandler}>click to focus</button>
      </div>
    )
  }
}

export default focusInput
