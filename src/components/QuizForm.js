import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizForm({setApiURL}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(null);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [type, setType] = useState("multiple");
    const [number, setNumber] = useState(20);

    useEffect(() => {
        const apiCategoryURL = `https://opentdb.com/api_category.php`;

        setLoading(true);

        fetch(apiCategoryURL)
        .then((response) => response.json())
        .then((data) => {
                setLoading(false);
                setOptions(data.trivia_categories);
            });
        }, [setOptions]);

        const handleCategoryChange = (e) => {
            setCategory(e.target.value);
            console.log(e.target.value);
        }
        const handleDifficultyChange = (e) => {
            setDifficulty(e.target.value);
            console.log(e.target.value);
        }
        const handleTypeChange = (e) => {
            setType(e.target.value);
            console.log(e.target.value);
        }
        const handleNumberChange = (e) => {
            let value = e.target.value;
            if (e.target.value > 50) {
                value = 50;
            } else {
                value = e.target.value;
            }
            setNumber(value);
            console.log(value);
        }

        function submitData() {
            setApiURL(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`);
            navigate('/quiz-game');
        }
    
    if (!loading) {
        return (
            <div className="quiz-app-container">
                <div className="container">
                    <form className="api-form" onSubmit={submitData}>
                        <div className="form-group">
                            <label htmlFor="difficulty-select">Difficulty</label>
                            <select className="form-control" id="difficulty-select" value={difficulty} onChange={handleDifficultyChange}>
                                <option value="easy" key="difficulty-0">Easy</option>
                                <option value="medium" key="difficulty-1">Medium</option>
                                <option value="hard" key="difficulty-2">Hard</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category-select">Category</label>
                            <select className="form-control" id="category-select" value={category} onChange={handleCategoryChange}>
                                <option>All</option>
                                {options &&
                                options.map((option) => (
                                    <option value={option.id} key={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="type-select">Question Type</label>
                            <select className="form-control" id="type-select" value={type} onChange={handleTypeChange}>
                                <option value="multiple" key="type-0">Multiple Choice</option>
                                <option value="boolean" key="type-1">True or False</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="number-select">Number of Questions</label>
                            <input className="form-control" id="number-select" type="number" min="10" max="50" value={number} onChange={handleNumberChange} />
                        </div>
                        <button className="btn btn-success" type="submit">Let the games begin!</button>
                    </form>
                </div>
            </div>
            );
        } else {
            <p>Loading...</p>
        }
}
