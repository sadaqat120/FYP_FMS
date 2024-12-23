import React, { Component } from "react";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  decrement() {
    this.setState({
      count: this.state.count - 1,
    });
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <div>Counter: {this.state.count}</div>
        <span>
          <button onClick={()=>{this.increment()}}>Increase by 1</button>
          <button onClick={()=>{this.decrement()}}>Decrease by 1</button>
        </span>
        <hr></hr>
      </div>
    );
  }
}

export default Counter;
