import React from 'react';
import heroBackground from '../assets/images/hero_section_quiz.svg';

export default function QuizMenu() {
    
    const apiURL = `https://opentdb.com/api.php?amount=20&enconde64`;
    
    return (

        <div className="container">
            <section className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }}>
                <div className="hero-text">
                    <h5>Do you know the answer to these trivia questions?</h5>
                    <h1>Are you sure?</h1>
                    <button className="btn btn-light">Challenge yourself</button>
                </div>
            </section>
            <section className="example_sections">

            </section>
        </div>

    )
}