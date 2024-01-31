import React, { useEffect } from "react";
import './Quiz.css';
import { Question } from "./Question.jsx";
import data from "../data.json";

export function Quiz() {
    const [quiz, setQuiz] = React.useState({
        score: 0,
        alive: true,
        questionNumber: 0,
        questions: [],
        currentQuestion: '',
        difficulty: 'easy',
    });

	
	/* Failed attempt at fetching questions from API 429 error: too many requests
		useEffect(() => {
		fetch(`https://opentdb.com/api.php?amount=10&difficulty=${quiz.difficulty}&category=18`)
			.then((response) => response.json())
			.then((data) => {
				setQuiz(quiz => ({
					...quiz,
					questions: data.results,
				}));
			});
	}, [quiz.difficulty]);

	*/


	useEffect(() => {
		setQuiz(quiz => ({
			...quiz,
			questions: data.results,
		}));

	}, []);

	function onAnswer(answer) {

		if (answer === quiz.questions[quiz.questionNumber].correct_answer) {
			setQuiz(quiz => ({
				...quiz,
				score: quiz.score + 1,
				questionNumber: quiz.questionNumber + 1,
				difficulty : (quiz.questionNumber+2) > 10 ? 'medium' : 'easy',
			}));
		} else {
			setQuiz(quiz => ({
				...quiz,
				score: 0,
				questionNumber: 0,
				difficulty: 'easy',
				alive: false,
			}));
		}
	}
	
    
	return (
		<div className="Quiz">
			<h1>Quiz App!</h1>
			<h2>Score: {quiz.score}</h2>
			<h2>Difficulty: {quiz.difficulty}</h2>

			<br />
			<h2>Question Number: {quiz.questionNumber + 1}</h2>
			{quiz.questions.length > 0 && quiz.questionNumber < quiz.questions.length && (
				<Question question={quiz.questions[quiz.questionNumber]} 
						onAnswer={onAnswer}
				/>
			)}
		</div>
	);
	
}
