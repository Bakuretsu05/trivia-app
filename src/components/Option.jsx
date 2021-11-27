import React from "react";

function Option(props) {
  return props.isAnswerChecked ? (
    <div
      className={`option answerChecked ${
        props.text === props.correctAnswer
          ? "correct"
          : props.isSelected
          ? "wrong"
          : ""
      }`}
    >
      {props.text}
    </div>
  ) : (
    <div
      className={`option ${props.isSelected ? "selected" : ""}`}
      onClick={props.handleSelect}
    >
      {props.text}
    </div>
  );
}

export default Option;
