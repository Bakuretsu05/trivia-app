import React from "react";
import "./style.css";

function Start(props) {
  return (
    <>
      <h1 className="app-title">Quizzical</h1>
      <p className="app-description">Quiz Game!!!</p>
      <button className="startButton" onClick={props.startQuiz}>
        Start quiz
      </button>
    </>
  );
}

export default Start;
