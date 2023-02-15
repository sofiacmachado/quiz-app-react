import QuizForm from './components/QuizForm';
import QuizGame from './components/QuizGame';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from 'react';
import './App.css';

function App() {

  const [apiURL, setApiURL] = useState(``);
  const callBack = useCallback((x) => {setApiURL(x); console.log(x)}, [setApiURL]);  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizForm setApiURL={callBack} />} />
        <Route path="/quiz-game" element={<QuizGame apiURL={apiURL} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
