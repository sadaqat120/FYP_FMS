import React from "react";

function event_handlig_in_stateless() {
  function clickhandler() {
    console.log("Button in stateless component is clicked!")
  }
  return (
    <div>
      <button onClick={clickhandler}>Click me</button>
    </div>
  );
}

export default event_handlig_in_stateless;
