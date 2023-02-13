import QuizForm from './components/QuizForm';
import QuizGame from './components/QuizGame';
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from 'react';
import './App.css';

function App() {

  const [apiURL, setApiURL] = useState(``);
  const callBack = useCallback((x) => {setApiURL(x)}, [setApiURL]);  

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<QuizForm apiURL={apiURL} setApiURL={callBack} />} />
        <Route path="/quiz-game" element={<QuizGame apiURL={apiURL} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
