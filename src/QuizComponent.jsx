import React, { useState, useEffect, useContext } from 'react';
import { QuizContext } from './QuizContext';

// Mảng dữ liệu cố định từ đề bài
const quizData = [
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
  // Sử dụng useState để quản lý các trạng thái
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sử dụng useContext để lấy dữ liệu input đã chọn
  const { selectedAnswer, setSelectedAnswer } = useContext(QuizContext);

  // Sử dụng useEffect để hiển thị câu hỏi từ state ra giao diện
  useEffect(() => {
    setQuestions(quizData);
  }, []);

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  // Hàm xử lý khi bấm Next và check đáp án
  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }

    // Kiểm tra đúng sai để cộng điểm
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Chuyển câu hoặc kết thúc
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(''); // reset lựa chọn câu sau
    } else {
      setIsCompleted(true);
    }
  };

  // 1. Giao diện khi hoàn thành (Ảnh số 2 trong đề)
  if (isCompleted) {
    return (
      <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#dc3545', fontSize: '48px', margin: '0 0 15px 0' }}>Quiz Completed!</h1>
        <p style={{ fontSize: '22px', margin: '0' }}>Your score: {score}</p>
      </div>
    );
  }

  // 2. Giao diện làm bài (Ảnh số 1 trong đề)
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <h1 style={{ color: '#dc3545', fontSize: '48px', margin: '0 0 10px 0' }}>
        Question {currentQuestionIndex + 1}
      </h1>
      <p style={{ fontSize: '20px', marginBottom: '25px', color: '#333' }}>
        {currentQuestion.question}
      </p>

      {/* Danh sách các input lựa chọn */}
      <div style={{ border: '1px solid #ced4da', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px' }}>
        {currentQuestion.answers.map((answer, index) => (
          <label
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              borderBottom: index < currentQuestion.answers.length - 1 ? '1px solid #ced4da' : 'none',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            <input
              type="radio"
              name="quiz-input"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={(e) => setSelectedAnswer(e.target.value)} // Cập nhật state qua useState/useContext
              style={{ marginRight: '12px', width: '18px', height: '18px' }}
            />
            {answer}
          </label>
        ))}
      </div>

      <button
        onClick={handleNext}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '12px 28px',
          fontSize: '18px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
}