import { useQuiz } from "../context/QuizProvider";

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

export default function App() {
  const {status} = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen />
        )}
        {status === "Active" && (
          <>
            <Progress/>
            <Question/>
            <Footer>
              <Timer />  
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'Finished' && <FinishedScreen /> }

      </Main>
    </div>
  );
}
