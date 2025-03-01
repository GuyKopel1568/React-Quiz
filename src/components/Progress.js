import { useQuiz } from "../context/QuizProvider";

function Progress() {
  const { numQuestions, points, maxPossiblePoints, answer, index } = useQuiz();
  console.log(numQuestions, points, maxPossiblePoints, answer, index);
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
