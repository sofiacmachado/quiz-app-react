import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import {decode as atob} from 'base-64'

export default function QuizGame({apiURL , number}) {
    
    const [loading, setLoading] = useState(true);
    const [dataQuestions, setDataQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answerOptions, setAnswerOptions] = useState([]);
    const [correctAnswerId, setCorrectAnswerId] = useState(0);
    const [score, setScore] = useState(0);
    
    

    function checkAnswer(e, id) {
      console.log('clicked');
      if (e.target.id == correctAnswerId) {
        console.log('correct');
        setScore(score + 1);
        questionIndex += 1;
      } else {
        console.log('keep trying');
      }
    }
    
    //fetch Trivia API URL
    useEffect(() => {
      setLoading(true);
      fetch(apiURL)
      .then((response) => (
        response.json()))
        .then((data) => {
          setDataQuestions(data.results);
          setLoading(false);
        })
      }, []);
      
    //wait for dataQuestion to print answers
    useEffect(() => {
      if (dataQuestions.length > 0) {
        let answersList = dataQuestions[questionIndex].incorrect_answers;
        let randomID = Math.floor(Math.random() * answerOptions.length);
        setCorrectAnswerId(randomID);
        answersList.splice(correctAnswerId, 0, dataQuestions[questionIndex].correct_answer);
        setAnswerOptions(answersList);
      } else {
        setAnswerOptions([]);
      }
    }, [dataQuestions]);

      return (
        <>
        {!loading ? 
        (
          <>
            <h2>Question {questionIndex + 1}</h2>
            <h4 id="question">{atob(dataQuestions[questionIndex].question)}</h4>
            <ul className="answers">
              {answerOptions.map((answer, id) => (<li><button type="button" key={id} onClick={(e) => checkAnswer(e, id)}>{atob(answer)}</button></li>))}
            </ul>
            <div>
              <p>Score: {score}/{number}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )
        }
      </>
    )
}