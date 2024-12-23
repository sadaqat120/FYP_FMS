import React, { Component } from "react";

class stateful extends Component {
  render() {
    return (
      <div>
        <h1> hey this is the stateful component</h1>
        <h2> Name: {this.props.name} and department is: {this.props.department} </h2>
        {this.props.children}
      </div>
    );
  }
}

export default stateful;
