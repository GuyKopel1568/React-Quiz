import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.payload };
    default:
      throw new Error("Active unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function() {
    fetch("http://localhost:5000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataRecived", payload: data }))
      .catch(res => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" &&
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />}
      </Main>
    </div>
  );
}
