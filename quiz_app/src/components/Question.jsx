import React, { useEffect, useState } from "react";

export function Question(props) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        const answers = [props.question.correct_answer, ...props.question.incorrect_answers];
        setShuffledAnswers(shuffleArray(answers));
    }, [props.question]);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };

    return (
        <div className="Question">
            <h2>{props.question.question}</h2>
            <div>
                {shuffledAnswers.map((answer, index) => (
                    <button key={index} onClick={() => props.onAnswer(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}
