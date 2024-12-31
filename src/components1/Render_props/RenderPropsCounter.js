import React, { Component } from "react";

export class RenderPropsCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  ClickHandler = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    return <div>{this.props.children(this.state.count, this.ClickHandler)}</div>;
  }
}

export default RenderPropsCounter;
