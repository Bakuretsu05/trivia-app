import React, { useState } from "react";
import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startQuiz = () => {
    setIsPlaying(true);
  };

  return (
    <div className="fullscreen-container">
      <div className="quiz-screen">
        {isPlaying ? <Quiz /> : <Start startQuiz={startQuiz} />}
      </div>
    </div>
  );
}

export default App;
