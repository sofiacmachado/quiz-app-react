import React, { useState, useEffect } from "react";


export default function QuizApp() {

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState("null");
    const [category, setCategory] = useState("");
    
    const handleCategoryChange = (e) => {
        setCategory(target.e.value)
    }

    useEffect(() => {
        const apiURL = "https://opentdb.com/api_category.php";

        setLoading(true);

        fetch(apiURL)
        .then((response) => response.json)
        .then((data) => {
            setOptions(data.trivia_categories);
        });
    }, [setOptions]);
    
    if(!loading) {
        return (
            <div className="quiz-app-container">
                <div className="container">
                    <select value={category} onChange={handleCategoryChange}>
                        <option>All</option>
                        {options &&
                        options.map((option) => {
                            <option value={option.id} key={key.id}>
                                {option.name}
                            </option>
                        })}
                        
                    </select>
                </div>
            </div>
            )
        } else {
            return(
                <p>Loading</p> 
            )
        }
}