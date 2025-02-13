import React from "react";

const HOCCounter = (OriginalComponent, count_times) => {
  class HOCCounter extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        count: 0,
      };
    }

    ClickHandler = () => {
      this.setState({
        count: this.state.count + count_times,
      });
    };
    render() {
      return (
        <OriginalComponent
          count={this.state.count}
          ClickHandler={this.ClickHandler}
          { ...this.props}
        />
      );
    }
  }
  return HOCCounter;
};
export default HOCCounter;
