import React, { useState, useEffect } from 'react';
import {decode as atob} from 'base-64'

export default function QuizGame({apiURL , number, score, questionIndex, setScore, setQuestionIndex}) {
    
    const [loading, setLoading] = useState(true);
    const [dataQuestions, setDataQuestions] = useState([]);
    const [answerOptions, setAnswerOptions] = useState([]);
    const [correctAnswerId, setCorrectAnswerId] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(false);

    const answerBtn = document.querySelector('#answer-btn');
    
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
      function checkAnswer(e, i) {
        setSelectedAnswer(true);
        console.log('clicked', i);
        if (i == (correctAnswerId)) {
          e.target.classList.add('correct-answer');
          console.log('correct');
          setScore(score + 1);
          setTimeout(() => {
            e.target.classList.remove('correct-answer');
            const index = questionIndex + 1;
            setQuestionIndex(index);
            printAnswers(index);   
            setSelectedAnswer(false);
          }, 1000)
        } else {
          e.target.classList.add('incorrect-answer');
          console.log('incorrect');
          setTimeout(() => {
            const index = questionIndex + 1;
            setQuestionIndex(index);
            printAnswers(index);
            e.target.classList.remove('incorrect-answer');
            setSelectedAnswer(false);
          }, 1000)
        }
      }
    
    return (
      <>
        {!loading ? 
          (
            <div className="container">
              <div className="question-game">
                <h5>Question {questionIndex + 1}</h5>
                <h4 id="question">{atob(dataQuestions[questionIndex].question)}</h4>
                <ul className="answers-list">
                  {answerOptions.map((answer, i) => (<li className='answers-list-item'><button disabled={selectedAnswer} className="btn btn-answers" id="answer-btn" type="button" key={i} onClick={(e) => checkAnswer(e, i)}>{atob(answer)}</button></li>))}
                </ul>
                <div className="score">
                  <p>Score: {score}/{number}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )
        }
      </>
    )
}