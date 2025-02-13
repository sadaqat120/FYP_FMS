import React from "react";

function render_data_list({Person}) { //use either teh props as to extract that all, otherise for some special , use as withn the curly braces.
  const maping = () => {
    return Person.map((eachperson,index) => (
      // Use the any property from your list which is unique to be set as the Key to avoid the key error in console. because it makes the each element from the list as the unique, or use the index as the key, but still there are some issues can be, which you can explore to deal with them. 
      <h2 key={index}>
        Name is {eachperson.name}, department is {eachperson.department}
      </h2>
    ));
  };

  return (
    <div>
      {/* if want to automatically call the function, then use the '()' at the end, otherwise, if want to only call to the function when some actions like onclick, then use withiut the braces. */}
      {maping()}
    </div>
  );
}

export default render_data_list;
