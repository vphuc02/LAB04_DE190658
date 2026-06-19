import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Quản lý câu trả lời mà người dùng đang chọn (input)
  const [selectedAnswer, setSelectedAnswer] = useState('');

  return (
    <QuizContext.Provider value={{ selectedAnswer, setSelectedAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};