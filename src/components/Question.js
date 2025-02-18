import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>
        {question.question}
        <Options question={question} dispatch={dispatch} answer={answer} />
      </h4>
    </div>
  );
}

export default Question;
