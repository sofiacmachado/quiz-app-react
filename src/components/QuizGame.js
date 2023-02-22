import React, { useState, useEffect } from 'react';
import {decode as atob} from 'base-64'
import { useNavigate } from "react-router-dom";

export default function QuizGame({apiURL, setApiURL, setSettings, number, score, questionIndex, setScore, setQuestionIndex}) {
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctAnswerId, setCorrectAnswerId] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  
    const answerBtn = document.getElementById(`answer-${correctAnswerId}`);
    
    //fetch Trivia API URL
    useEffect(() => {
      setLoading(true);
      fetch(apiURL)
      .then((response) => (
        response.json()))
        .then((data) => {
          setDataQuestions(data.results);
          setLoading(false);
          console.log(dataQuestions);
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
        e.preventDefault();
        setSelectedAnswer(true);
        console.log('clicked', i);
        if (i == (correctAnswerId)) {
          //light up answer
          e.target.classList.add('correct-answer');
          console.log('correct');
          setScore(score + 1);
          setTimeout(() => {
            e.target.classList.remove('correct-answer');
            const index = questionIndex + 1;
            setQuestionIndex(index);
            printAnswers(index);   
            setSelectedAnswer(false);
          }, 2000)
        } else {
          console.log(answerBtn);
          //light up answers
          e.target.classList.add('incorrect-answer');
          answerBtn.classList.add("correct-answer");
          console.log('incorrect');
          setTimeout(() => {
            const index = questionIndex + 1;
            setQuestionIndex(index);
            printAnswers(index);
            e.target.classList.remove('incorrect-answer');
            answerBtn.classList.remove("correct-answer");
            setSelectedAnswer(false);
          }, 2000)
        }
      }
    
      //Play again
      function playAgain() {
        setSettings(false);
        setScore(0);
        setDataQuestions([]);
        setCorrectAnswerId(0);
        setQuestionIndex(0);
        setSelectedAnswer(false);
        setApiURL(``);
        navigate('/');
      }
      
    return (
      <>
        {!loading ? 
          (
            <div className="container">
              {/* Final Score */}
              {questionIndex >= number ?
              (
                <div className="final-page">
                  <h2>Final Score</h2>
                  <div className='final-score'>
                    <h3 className='score-h3'>{score}</h3>
                    <h4>out of</h4>
                    <h3>{number} questions</h3>
                  </div>
                  <button onClick={playAgain} className="btn btn-light btn-quiz">Play Again</button>
                </div>
              )
            :
            /* Game Quiz */
            (
              <div className="question-game">
                <h5>Question {questionIndex + 1}</h5>
                <h4 id="question">{atob(dataQuestions[questionIndex].question)}</h4>
                <ul className="answers-list">
                  {answerOptions.map((answer, i) => (<li className='answers-list-item'><button disabled={selectedAnswer} className="btn btn-answers" id={`answer-${i}`} type="button" key={i} onClick={(e) => checkAnswer(e, i)}>{atob(answer)}</button></li>))}
                </ul>
                <div className="score">
                  <p>Score: {score}/{number}</p>
                </div>
              </div>
            )}
            </div>
          ) : (
            <div className="container">
                <p className='loading'>Loading...</p>
            </div>
          )
        }
      </>
    )
}