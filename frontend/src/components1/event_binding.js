import React, { Component } from "react";
// there are four approaches to handle the event in Javascript/React

class EventBinding extends Component {
  constructor() {
    super();
    this.state = {
      text_on_screen: "Welcome to ReactJs!",
    };
    this.goodbye= this.goodbye.bind(this)
  }

  goodbye() {
    this.setState({
      text_on_screen: "Good bye! ",
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.text_on_screen}</h2>
        <button onClick={()=>{this.goodbye()}}>click to goodbye!</button>
        <button onClick={this.goodbye.bind(this)}>click to goodbye!</button>
        <button onClick={this.goodbye}>click to goodbye!</button>
        {/* and the 4th is  like the sam eas the 1st, as there we were making s const function at the click, and in teh forth option is that , that rather than we make a method (function type), we make a const function instead of method  and then call it as simple like: this.goodbye*/}
      </div>
    );
  }
}

export default EventBinding;
