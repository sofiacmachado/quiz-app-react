import React, { useState, useEffect } from 'react';
import heroBackground from '../assets/images/hero_section_quiz.svg';
import {decode as atob} from 'base-64';

export default function QuizMenu({setSettings}) {
    
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState([]);
    const [randomID, setRandomID] = useState();

    
    useEffect(() => {
        setLoading(true);
        fetch(`https://opentdb.com/api.php?amount=20&encode=base64`)
        .then((response) => (
            response.json()))
            .then((data) => {
                setQuestion(data.results);
                setRandomID(Math.floor(Math.random() * (question.length + 1)));
                setLoading(false);
            })
    }, [])
    
    return (
        (!loading ?
            (<div className="container">
                <section className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }}>
                    <div className="hero-text">
                        <h5>Do you know the answer to these trivia questions?</h5>
                        <h1>Are you sure?</h1>
                        <button onClick={() => setSettings(true)} className="btn btn-light  btn-quiz">Challenge yourself</button>
                    </div>
                </section>
                <section className="example-section">
                    <div className="text-example">
                        <h2>Take a look at some questions</h2>
                        <h4>Are you up for the challenge?</h4>
                    </div>
                    <div className="question-example">
                        <p className="question-block" id="question-b-1">{atob(question[randomID].question)}</p>
                        <p className="question-block" id="question-b-2">{atob(question[randomID + 1].question)}</p>
                        <p className="question-block" id="question-b-3">{atob(question[randomID + 2].question)}</p>
                    </div>
                </section>
            </div>
            )
            :
            (<p>Loading</p>)
        )
    )
}