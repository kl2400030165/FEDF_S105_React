import { Provider, useDispatch, useSelector } from "react-redux";
import { store, increment } from "./Store";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}
function ReduxDemo() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default ReduxDemo;