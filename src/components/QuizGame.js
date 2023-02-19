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
      
      //print answers
      function printAnswers(i) {
        if (dataQuestions.length > 0) {
          setAnswerOptions([]);
          let answersList = dataQuestions[i].incorrect_answers;
          let randomID = Math.floor(Math.random() * (answersList.length + 1));
          setCorrectAnswerId(randomID);
          answersList.splice(randomID, 0, dataQuestions[i].correct_answer);
          setAnswerOptions(answersList);
        } else {
          setAnswerOptions([]);
        }
      }
      
      //wait for dataQuestion to print answers
      useEffect(() => {
        printAnswers(questionIndex);
      }, [dataQuestions]);

      //select answer
      function checkAnswer(i) {
        console.log('clicked', i);
        if (i == (correctAnswerId)) {
          console.log('correct');
          setScore(score + 1);
          const index = questionIndex + 1;
          setQuestionIndex(index);
          printAnswers(index);
        } else {
          
        }
      }

      return (
        <>
        {!loading ? 
        (
          <>
            <h2>Question {questionIndex + 1}</h2>
            <h4 id="question">{atob(dataQuestions[questionIndex].question)}</h4>
            <ul className="answers">
              {answerOptions.map((answer, i) => (<li><button type="button" key={i} onClick={() => checkAnswer(i)}>{atob(answer)}</button></li>))}
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