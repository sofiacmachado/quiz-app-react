import QuizForm from './components/QuizForm';
import QuizGame from './components/QuizGame';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from 'react';
import './App.css';

function App() {

  const [apiURL, setApiURL] = useState(``);
  const [number, setNumber] = useState(20);
  const callBackAPI = useCallback((x) => {setApiURL(x); console.log(x)}, [setApiURL]);  
  const callBackNumber = useCallback((x) => {setNumber(x); console.log(x)}, [setNumber]);  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizForm setApiURL={callBackAPI} number={number} setNumber={callBackNumber} />} />
        <Route path="/quiz-game" element={<QuizGame apiURL={apiURL} number={number} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
