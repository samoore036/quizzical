import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import he from 'he'; //package to decode from html

export default function Quiz(props) {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [answers, setAnswers] = React.useState([]);
    const [userAnswers, setUserAnswers] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);

    React.useEffect(() => {
        const getData = async() => {
            try {
                const response = await fetch(props.apiRequest);
                let responseData = await response.json();
                let actualData = responseData.results;
                setData(actualData.map(data => {
                    return(
                        {
                            question: he.decode(data.question),
                            correctAnswer: he.decode(data.correct_answer),
                            answers: shuffleArray([...data.incorrect_answers, data.correct_answer], data.type)
                        }
                    )
                }));
                setError(null);
            } catch(err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    React.useEffect(() => {
        if (data) {
            setAnswers(data.map(obj => obj.correctAnswer));
        }
    }, [data])

    function mapQuestions() {
        let id = -1;
        const questions = data.map(obj => {
            id++;
            return(
                <Question 
                    key={id}
                    id={id}
                    question={he.decode(obj.question)}
                    correctAnswer={obj.correctAnswer}
                    answerArray={obj.answers}
                    userAnswers={userAnswers}
                    showResults={showResults}
                    handleClick={showResults ? null : (e) => handleClick(e)}
                />
            )
        })
        return questions;
    }

    function shuffleArray(array, type) {
        if (type !== 'multiple') {
            return array;
        }
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [he.decode(array[j]), he.decode(array[i])];
        }
        return array;
    }

    function handleClick(e) {
        const { textContent } = e.target;
        const { id } = e.target.parentElement;
        setUserAnswers(prevState => {
            let newArray = [...prevState];
            newArray[id] = textContent;
            return newArray;
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (showResults && e.target.id === 'submit-btn') {
            props.reset();
        } else {
            setShowResults(true);
        }
    }

    function getCorrect() {
        let correct = 0;
        for (let i = 0; i < answers.length; i++) {
            if (userAnswers[i] === answers[i]) {
                correct++;
            }
        }
        return correct;
    }

    return(
        <form className='quiz'>
            {(!loading || showResults) && mapQuestions()}
            <div className='end-div'>
                {showResults && <p>You scored {getCorrect()}/{answers.length}</p>}
                <button id='submit-btn' onClick={handleSubmit}>{showResults ? 'Play Again' : 'Check Answers'}</button>
            </div>
        </form>        
    )
}