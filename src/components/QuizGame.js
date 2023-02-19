import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

export default function QuizGame({apiURL , number}) {
    
    const [loading, setLoading] = useState(true);
    const [dataQuestions, setDataQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    
    useEffect(() => {
      setLoading(true);
      fetch(apiURL)
      .then((response) => (
        response.json()))
        .then((data) => {
          setDataQuestions(data.results)
          setLoading(false);
        })
      }, [])
      
      /* setQuestionIndex(questionIndex + 1);
      useEffect(() => {
        if (!dataQuestions) {
          return;
        } else {
          
        }
      }) */
      
      return (
        <>
        {!loading ? 
        (
          <>
            <h2>Question {questionIndex + 1}</h2>
            <h4 id="question" dangerouslySetInnerHTML={{__html: dataQuestions[questionIndex].question}}></h4>
            <ul className="answers" dangerouslySetInnerHTML={{__html: ReactDOMServer.renderToStaticMarkup(dataQuestions[questionIndex].incorrect_answers.map((incorrectAnswer) => (<li>{incorrectAnswer}</li>)))}}>
              
            </ul>
            <div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )
        }
      </>
    )
}