import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import  Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

const SECONDS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "Active",  secondsRemaining: state.questions.length * SECONDS_PER_QUESTION };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case "finish":
      return{  ...state, status: "Finished", highscore:  state.points > state.highscore ? state.points : state.highscore }
    case  "restart":
      return {...initialState, status: "Ready",  questions: state.questions};
    case "tick":
      return { ...state, secondsRemaining: state.secondsRemaining - 1,  status:state.secondsRemaining === 0 ? "Finished" : state.status};
    default:
      throw new Error("Active unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points,  highscore,  secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((res) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "Active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer  dispatch={dispatch} secondsRemaining={secondsRemaining}/>  
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        )}
        {status === 'Finished' && <FinishedScreen  points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} /> }

      </Main>
    </div>
  );
}
