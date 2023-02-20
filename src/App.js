import QuizForm from './components/QuizForm';
import QuizGame from './components/QuizGame';
import FinalScore from './components/FinalScore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from 'react';
import './App.css';

function App() {

  const [settings, setSettings] = useState(false);
  const [apiURL, setApiURL] = useState(``);
  const [number, setNumber] = useState(20);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const callBackSettings = useCallback((x) => {setSettings(x)}, [setSettings]);  
  const callBackAPI = useCallback((x) => {setApiURL(x)}, [setApiURL]);  
  const callBackNumber = useCallback((x) => {setNumber(x)}, [setNumber]);  
  const callBackScore = useCallback((x) => {setScore(x)}, [setScore]);  
  const callBackQuestionIndex = useCallback((x) => {setQuestionIndex(x)}, [setQuestionIndex]);  

  //change components
  let initialComponent;
  if (settings) {
    initialComponent = <QuizForm setApiURL={callBackAPI} number={number} setNumber={callBackNumber} />;
  } else {
    initialComponent = <QuizMenu settings={settings} setSettings={callBackSettings} />;
  }
  let gameComponent;
  if (questionIndex >= number) {
    gameComponent = <FinalScore number={number} score={score} questionIndex={questionIndex} setQuestionIndex={callBackQuestionIndex} />;
  } else {
    gameComponent = <QuizGame apiURL={apiURL} number={number} score={score} setScore={callBackScore} questionIndex={questionIndex} setQuestionIndex={callBackQuestionIndex} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={initialComponent} />
        <Route path="/quiz-game" element={gameComponent} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
