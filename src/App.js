import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  status: "Loading"
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "Ready" };
    default:
      throw new Error("Active unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function() {
    fetch("http://localhost:5000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataRecived", payload: data }))
      .catch(res => console.error("Error"));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
