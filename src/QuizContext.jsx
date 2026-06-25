import React, { createContext, useState, useEffect } from 'react';

export const QuizContext = createContext();

const DEFAULT_QUESTIONS = [
  {
    question: 'What is ReactJS?',
    answers: ['A JavaScript library for building user interfaces', 'A programming language', 'A database management system'],
    correctAnswer: 'A JavaScript library for building user interfaces'
  },
  {
    question: 'What is JSX?',
    answers: ['A programming language', 'A file format', 'A syntax extension for JavaScript'],
    correctAnswer: 'A syntax extension for JavaScript'
  },
  {
    question: 'What is the purpose of the useState hook in React?',
    answers: [
      'To manage state in functional components',
      'To fetch data from an external API',
      'To style React components'
    ],
    correctAnswer: 'To manage state in functional components'
  }
];

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('quiz_questions');
    return saved ? JSON.parse(saved) : DEFAULT_QUESTIONS;
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    localStorage.setItem('quiz_questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (newQuestion) => {
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const deleteQuestion = (indexToDelete) => {
    setQuestions((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        addQuestion,
        deleteQuestion,
        selectedAnswer,
        setSelectedAnswer
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};