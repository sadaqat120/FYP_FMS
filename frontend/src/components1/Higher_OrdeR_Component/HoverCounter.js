import React, { Component } from "react";
import HOCCounter from "./HOC_Counter";

class HoverCounter extends Component {
  render() {
    const { count, ClickHandler } = this.props;
    return (
      <div>
        <h4>{this.props.name}</h4>
        <h3 onMouseOver={ClickHandler}>Hovered {count} times</h3>
      </div>
    );
  }
}

export default HOCCounter(HoverCounter, 3);
