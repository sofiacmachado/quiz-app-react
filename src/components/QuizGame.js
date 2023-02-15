import React, { useState, useEffect } from 'react';

export default function QuizGame({apiURL}) {
    
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    
    
    const randomInteger = max => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    useEffect(() => {
        setLoading(true);
        fetch(apiURL)
        .then((response) => (
          response.json()))
        .then((data) => {
            setLoading(false);
            setQuestions(data.results)
            console.log(questions)
        })
      }, [setQuestions])

    return (
      <>
        {!loading ? 
        (
          <>
            <h2>Question {questionIndex + 1}</h2>
            <h3></h3>
            <ul>
              <li>
              {questions[0].question}
              </li>
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