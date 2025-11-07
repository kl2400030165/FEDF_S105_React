import { useState } from "react";

function Child({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function Childtoparent() {
  const [text, setText] = useState("");
  return (
    <div>
      <Child value={text} onChange={setText} />
      <p>You typed: {text}</p>
    </div>
  );
}
export default Childtoparent;