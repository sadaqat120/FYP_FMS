import React, { Component } from 'react'

class input extends Component {
    constructor(props) {
      super(props)
      this.inputRef = React.createRef()
    }
    
    focusing_on_input(){
        this.inputRef.current.focus()
    }

  render() {
    return (
      <div>
        <input ref={this.inputRef}></input>   
      </div>
    )
  }
}

export default input
