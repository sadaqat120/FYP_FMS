import React, { Component } from 'react'

class react_refs extends Component {
    constructor(props) {
      super(props)
    //   1st method
      this.inputRef = React.createRef()
      //2nd method
      this.cbRef=null
      this.setCbRef = element =>{
        this.cbRef = element
      }
    }

    componentDidMount() {
        //2nd method
        if (this.cbRef) {
            this.cbRef.focus()
        }

        // below the 1st method 
        // this.inputRef.current.focus()
        // console.log(this.inputRef)
    }

    clickHandler =()=>{
        alert(this.inputRef.current.value)
    }
    
  render() {
    return (
      <div>
        <input type='text' ref={this.inputRef}></input>
        <input type='text' ref={this.setCbRef}></input>
        <button onClick={this.clickHandler}>Click</button>
      </div>
    )
  }
}

export default react_refs
