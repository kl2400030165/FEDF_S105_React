import React, { useState } from "react";
function State() {
  // Declare state variable with initial value 0
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1); // updates state
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increase}>Increase</button>
    </div>
  );
}

export default State;