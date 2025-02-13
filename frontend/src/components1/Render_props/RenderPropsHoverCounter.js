import React, { Component } from "react";

class RenderPropsHoverCounter extends Component {
  render() {
    const { count, ClickHandler } = this.props;
    return <h3 onMouseOver={ClickHandler}>Hovered {count} times</h3>
  }
}

export default RenderPropsHoverCounter;
