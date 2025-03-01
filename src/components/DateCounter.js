import { useReducer } from "react";

const _initialState = { count: 0, step: 1 };
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return _initialState;

    default:
      throw new Error("Unknown  action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, _initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("February 17 2025");
  date.setDate(date.getDate() + count);

  const dec = function() {
    dispatch({ type: "dec", payload: 1 });
  };

  const inc = function() {
    dispatch({ type: "inc", payload: 1 });
  };

  const defineCount = function(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function(e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function() {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>
          {step}
        </span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>
        {date.toDateString()}
      </p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
