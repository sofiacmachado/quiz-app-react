import React, { useState, useEffect } from 'react';

export default function QuizGame({ apiURL }) {
    
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            setLoading(false);
            setQuestions
        })
    })

    return (
        <>
            <h2>123</h2>
        </>
    )
}