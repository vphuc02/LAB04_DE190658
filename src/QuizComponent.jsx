import React, { useState, useEffect, useContext } from 'react';
import { QuizContext } from './QuizContext';

export const quizData = [
  {
    question: 'What is ReactJS?',
    answers: ['A JavaScript library for building user interfaces', 'A programming language', 'A database management system'],
    correctAnswer: 'A JavaScript library for building user interfaces'
  },
  {
    question: 'What is JSX?',
    answers: ['A programming language', 'A file format', 'A syntax extension for JavaScript'],
    correctAnswer: 'A syntax extension for JavaScript'
  }
];

export default function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { selectedAnswer, setSelectedAnswer } = useContext(QuizContext);

  useEffect(() => {
    setQuestions(quizData);
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuiz = questions[currentIndex];

  const handleAction = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }

    if (!isChecked) {
      const correct = selectedAnswer === currentQuiz.correctAnswer;
      setIsCorrect(correct);
      if (correct) {
        setScore(prev => prev + 1);
      }
      setIsChecked(true);
      return;
    }

    setIsChecked(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#dc3545', fontSize: '46px', margin: '0 0 15px 0', fontWeight: 'bold' }}>Quiz Completed!</h1>
        <p style={{ fontSize: '24px', margin: '0' }}>Your score: {score}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <h1 style={{ color: '#dc3545', fontSize: '46px', margin: '0 0 10px 0', fontWeight: 'bold' }}>
        Question {currentIndex + 1}
      </h1>
      <p style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
        {currentQuiz.question}
      </p>

      <div style={{ border: '1px solid #ced4da', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px' }}>
        {currentQuiz.answers.map((answer, index) => {
          let bg = 'transparent';
          if (isChecked) {
            if (answer === currentQuiz.correctAnswer) bg = '#d4edda';
            else if (selectedAnswer === answer) bg = '#f8d7da';
          }

          return (
            <label
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                borderBottom: index < currentQuiz.answers.length - 1 ? '1px solid #ced4da' : 'none',
                cursor: 'pointer',
                fontSize: '18px',
                backgroundColor: bg
              }}
            >
              <input
                type="radio"
                name="quiz-options"
                value={answer}
                disabled={isChecked}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                style={{ marginRight: '12px', width: '18px', height: '18px' }}
              />
              {answer}
            </label>
          );
        })}
      </div>

      {isChecked && (
        <div style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
          {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer!'}
        </div>
      )}

      <button
        onClick={handleAction}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '12px 35px',
          fontSize: '18px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {isChecked ? 'Next' : 'Check Answer'}
      </button>
    </div>
  );
}