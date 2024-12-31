import React, { Component } from "react";
import HOCCounter from "./HOC_Counter";

class ClickCounter extends Component {
  render() {
    const { count, ClickHandler } = this.props;
    return (
      <div>
        <h4>{this.props.name}</h4>
        <button onClick={ClickHandler}>Clicked {count} times</button>
      </div>
    );
  }
}

export default HOCCounter(ClickCounter, 5);
