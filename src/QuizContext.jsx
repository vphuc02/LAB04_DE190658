import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  return (
    <QuizContext.Provider value={{ selectedAnswer, setSelectedAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};