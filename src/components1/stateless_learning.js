import React from "react";

const stateless = (props) => {
  return (
    <div>
      <h1> hey this is the stateless component</h1>
      <h2> Name is {props.name} and department is: {props.department} </h2>
      {props.children}
    </div>
  );
};

export default stateless;
