import React, { useEffect } from 'react';

export default function FinalScore({number, score, setScore, questionIndex, setQuestionIndex}) {

    //final score
    useEffect(() => {
        if (score >= (number / 2)){
            alert('You won with ' + {score} + ' correct questions out of ' + {number} + ' questions.' )
        } else {
        alert('You loose!')
        }
    })

    return (
        <div>Final Score</div>
    )
}