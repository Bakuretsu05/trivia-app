import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./style.css";
import QuizItem from "./QuizItem";

// helper function to decode the data that got returned from fetch
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// helper function to create option objects with id and text properties
function getOptions(options, answer) {
  let optionObjects = options.map((option) => ({
    id: nanoid(),
    text: decodeHtml(option),
  }));
  optionObjects.unshift({
    id: nanoid(),
    text: decodeHtml(answer),
  });

  const randIndex = Math.floor(Math.random() * optionObjects.length);
  [optionObjects[0], optionObjects[randIndex]] = [
    optionObjects[randIndex],
    optionObjects[0],
  ];

  return optionObjects;
}

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const datas = await res.json();

    setQuizzes(
      datas.results.map((data) => ({
        id: nanoid(),
        question: decodeHtml(data.question),
        answer: decodeHtml(data.correct_answer),
        options: getOptions(data.incorrect_answers, data.correct_answer),
        selectedOption: null,
      }))
    );
  };

  const handleSelect = (quizId, text) => {
    setQuizzes((currQuiz) => {
      return currQuiz.map((quizzes) =>
        quizzes.id === quizId ? { ...quizzes, selectedOption: text } : quizzes
      );
    });
  };

  const checkAnswer = () => {
    setCorrectAnswer(() => {
      let sum = 0;

      quizzes.forEach((quiz) => {
        if (quiz.selectedOption === quiz.answer) {
          sum++;
        }
      });

      return sum;
    });
    setIsAnswerChecked(true);
  };

  const resetGame = () => {
    setQuizzes([]);
    setIsAnswerChecked(false);
    fetchQuizzes();
  };

  const QuizItems = quizzes.map((quiz) => (
    <QuizItem
      key={quiz.id}
      handleSelect={handleSelect}
      isAnswerChecked={isAnswerChecked}
      {...quiz}
    />
  ));

  return (
    <>
      <div className="quizzes-container">
        {quizzes.length ? (
          QuizItems
        ) : (
          <h1 className="loading-text">Loading...</h1>
        )}
      </div>

      <div className="button-container">
        {quizzes.length > 0 &&
          (isAnswerChecked ? (
            <>
              <h3>You scored {`${correctAnswer}/${quizzes.length}`}</h3>
              <button className="button" onClick={resetGame}>
                Play again
              </button>
            </>
          ) : (
            <button className="button" onClick={checkAnswer}>
              Check answers
            </button>
          ))}
      </div>
    </>
  );
}
