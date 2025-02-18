function FinishedScreen({ points, maxPossiblePoints,  highscore,  dispatch }) {
  const percentege = points / maxPossiblePoints * 100;

  let emoji;
  if (percentege === 100) emoji = "🎉";
  if (percentege < 100 && percentege >= 90) emoji = "😎";
  if (percentege < 90 && percentege >= 70) emoji = "😌";
  if (percentege < 70 && percentege >= 50) emoji = "🤨";
  if (percentege < 50) emoji = "🤢";

  return (
    <>
    <p className="result">
      <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
      {maxPossiblePoints} (
      {Math.ceil(percentege)}%)
    </p>

    <p className="highscore">(Highscore : {highscore}   points)</p>

    <button  className="btn btn-ui" onClick={()=> dispatch({type: "restart"})}>Restart The  Quiz</button>
    </>
  );
}

export default FinishedScreen;
