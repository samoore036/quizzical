import React from 'react';
import { nanoid } from 'nanoid';

export default function Question(props) {
    const {question, answerArray, id, showResults, correctAnswer} = props;
    const answers = [...answerArray];
    const userAnswers = [...props.userAnswers];

    function stylePicker(answer) {
        const styles = {
            backgroundColor: 'transparent'
        }

        if (!showResults && userAnswers[id] === answer) {
            styles.backgroundColor = 'white';
        } else if (showResults && answer === correctAnswer) {
            styles.backgroundColor = '#16a34a';
        } else if (showResults && userAnswers[id] === answer && answer !== correctAnswer) {
            styles.backgroundColor = '#ef4444';
        }
        return styles;
    }

    const answerElements = answers.map(answer => {
        return(
            <div className='question-btn'
                key={nanoid()}
                value={answer}
                onClick={!showResults ? props.handleClick : null}
                style={stylePicker(answer)}
            >
                {answer}
            </div>
        )
    })

    return(
        <fieldset>
            <legend>{question}</legend>
            <div className='question-div' id={id}>
                {answerElements}
            </div>
        </fieldset>
    )
}