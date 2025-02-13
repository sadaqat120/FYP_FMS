import React, { Component } from "react";
import ChildMountinglifecycleMethod from "./Child_Mounting_lifecycleMethod";

class Parent_Mounting_lifecycleMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Sadaqat",
    };
    console.log("Parent Mounting lifecycle Constructor!");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("Parent Mounting lifecycle getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("Parent Mounting lifecycle componentDidMount");
  }
  render() {
    console.log("Parent Mounting lifecycle render");
    return <div>
      Parent_Mounting_lifecycleMethod
      <h3>Mounting Lifecylce method: (see the console for understanding and result)</h3>
      <ChildMountinglifecycleMethod/>
    </div>;
  }
}

export default Parent_Mounting_lifecycleMethod;
