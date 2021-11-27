import React from "react";
import "./style.css";
import Option from "./Option";

function QuizItem(props) {
  const optionElements = props.options.map((option) => (
    <Option
      key={option.id}
      isAnswerChecked={props.isAnswerChecked}
      correctAnswer={props.answer}
      handleSelect={() => props.handleSelect(props.id, option.text)}
      isSelected={props.selectedOption === option.text ? true : false}
      text={option.text}
    />
  ));

  return (
    <div className="quiz-item-container">
      <h3 className="quiz-question">{props.question}</h3>

      <div className="option-container">{optionElements}</div>
    </div>
  );
}

export default QuizItem;
