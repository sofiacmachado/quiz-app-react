import React, { useState, useEffect } from "react";


export default function QuizApp() {

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(null);
    const [category, setCategory] = useState("");

    useEffect(() => {
        const apiURL = "https://opentdb.com/api_category.php";

        setLoading(true);

        fetch(apiURL)
        .then((response) => response.json)
        .then((data) => {
                setLoading(false);
                setOptions(data.trivia_categories);
            });
        }, [setOptions]);

        const handleCategoryChange = (e) => {
            setCategory(e.target.value)
        }
    
    if (!loading) {
        return (
            <div className="quiz-app-container">
                <div className="container">
                    <h2>Select category:</h2>
                    <select value={category} onChange={handleCategoryChange}>
                        <option>All</option>
                        {options &&
                        options.map((option) => (
                            <option value={option.id} key={option.id}>
                                {option.name}
                            </option>
                        ))}
                        
                    </select>
                </div>
            </div>
            );
        } else {
            <p>Loading...</p>
        }
}
