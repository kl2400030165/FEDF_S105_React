import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return <h2>Time: {time}s</h2>;
}
export default Timer;