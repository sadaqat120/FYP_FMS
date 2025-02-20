import React, { Component } from "react";

class RenderPropsClickCounter extends Component {
  render() {
    const { count, ClickHandler } = this.props;
    return <button onClick={ClickHandler}>Clicked {count} times</button>
  }
}

export default RenderPropsClickCounter;
