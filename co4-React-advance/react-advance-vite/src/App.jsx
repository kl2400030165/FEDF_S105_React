import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Component using hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>ADD</button>
      <button onClick={decrement}>SUB</button>
      <button onClick={reset}>REFRESH</button>
    </div>
  );
}

// ✅ Only one App
export default function App() {
  return <Counter />;
}
