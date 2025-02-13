import React from "react";

function ErrorSampleCodeFile({ name, department }) {
  if (department !== "CS") {
    throw new Error("Not from the CS department!");
  }
  return (
    <div>
      <h4>
        Name is {name} and the department is {department}.
      </h4>
    </div>
  );
}

export default ErrorSampleCodeFile;
