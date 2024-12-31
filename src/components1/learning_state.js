import React, { Component } from "react";

class StateChange extends Component {
  constructor() {
    super();
    this.state = {
      text_on_screen: "Welcome to ReactJs!",
      click_button: "Subscribe!",
    };
  }

  change_text_to_thanks() {
    this.setState({
      text_on_screen: "Thanks for subscribing ! ",
      click_button: "Learn ReactJs",
    });
  }

  change_text_to_welcome() {
    this.setState({
      text_on_screen: "Welcome to ReactJs!",
      click_button: "Subscribe!",
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.text_on_screen}</h2>
        <button
          onClick={() => {
            if (this.state.click_button === "Learn ReactJs") {
              this.change_text_to_welcome();
            } else {
              this.change_text_to_thanks();
            }
          }}
        >
          {this.state.click_button}
        </button>
      </div>
    );
  }
}

export default StateChange;
