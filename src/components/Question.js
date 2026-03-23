import React, { useState, useEffect, useRef } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timerRef = useRef(null);

  useEffect(() => {
    // schedule the next tick
    timerRef.current = setTimeout(() => {
      setTimeRemaining((seconds) => {
        if (seconds <= 1) {
          onAnswered(false);
          return 10;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    clearTimeout(timerRef.current);
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
