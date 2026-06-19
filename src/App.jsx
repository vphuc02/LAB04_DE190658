import React from 'react';
import { QuizProvider } from './QuizContext';
import QuizComponent from './QuizComponent';

function App() {
  return (
    <QuizProvider>
      <QuizComponent />
    </QuizProvider>
  );
}

export default App;