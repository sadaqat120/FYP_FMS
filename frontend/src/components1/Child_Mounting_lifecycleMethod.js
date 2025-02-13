import React, { Component } from "react";

class Child_Mounting_lifecycleMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Sadaqat",
    };
    console.log("Child Mounting lifecycle Constructor!");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("Child Mounting lifecycle getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("Child Mounting lifecycle componentDidMount");
  }
  render() {
    console.log("Child Mounting lifecycle render");
    return <div>
      Child_Mounting_lifecycleMethod
      <h3>Mounting Lifecylce method: (see the console for understanding and result)</h3>
      
    </div>;
  }
}

export default Child_Mounting_lifecycleMethod;
