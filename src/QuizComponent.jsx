import React, { useState, useContext } from 'react';
import { QuizContext } from './QuizContext';
import './App.css';

export default function QuizComponent() {
  const {
    questions,
    addQuestion,
    deleteQuestion,
    selectedAnswer,
    setSelectedAnswer
  } = useContext(QuizContext);

  // Tab navigation state: 'play' | 'create' | 'manage'
  const [activeTab, setActiveTab] = useState('play');

  // Quiz play state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Form state for creating question
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswers, setNewAnswers] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuiz = questions[currentIndex];

  const handleAction = () => {
    if (!selectedAnswer) {
      alert("Vui lòng chọn một đáp án!");
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

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsCompleted(false);
    setIsChecked(false);
    setSelectedAnswer('');
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!newQuestion.trim()) {
      setErrorMessage('Nội dung câu hỏi không được để trống.');
      return;
    }

    const trimmedAnswers = newAnswers.map(ans => ans.trim());
    if (trimmedAnswers.some(ans => ans === '')) {
      setErrorMessage('Vui lòng điền đầy đủ cả 4 phương án trả lời.');
      return;
    }

    const correctAnswerText = trimmedAnswers[correctAnswerIndex];

    const questionObj = {
      question: newQuestion.trim(),
      answers: trimmedAnswers,
      correctAnswer: correctAnswerText
    };

    addQuestion(questionObj);
    setSuccessMessage('Tạo câu hỏi mới thành công!');

    // Reset Form
    setNewQuestion('');
    setNewAnswers(['', '', '', '']);
    setCorrectAnswerIndex(0);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...newAnswers];
    updated[index] = value;
    setNewAnswers(updated);
  };

  const handleDelete = (index) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      deleteQuestion(index);
      
      // If we are currently playing and delete a question, reset play state
      // or adjust indexes. To be safe, let's reset play state on deletion.
      handleReset();
    }
  };

  return (
    <div className="quiz-container">
      {/* Brand Header */}
      <header className="app-header">
        <h1 className="brand-title">Quiz Master</h1>
        <p className="brand-subtitle">Thiết kế & Trải nghiệm bài trắc nghiệm thông minh</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => { setActiveTab('play'); }}
        >
          🎮 Trắc Nghiệm
        </button>
        <button
          className={`nav-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => { setActiveTab('create'); }}
        >
          ➕ Tạo Câu Hỏi
        </button>
      </nav>

      {/* Play Tab */}
      {activeTab === 'play' && (
        <div className="quiz-card">
          {questions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3>Không có câu hỏi nào</h3>
              <p>Nhấp vào tab "Tạo Câu Hỏi" ở trên để bắt đầu thêm câu hỏi mới!</p>
            </div>
          ) : isCompleted ? (
            <div className="score-container">
              <div className="score-badge">
                <span className="score-num">{score}</span>
                <span className="score-total">/ {questions.length}</span>
              </div>
              <h2 className="score-text">
                {score === questions.length ? 'Xuất Sắc! 🎉' : score >= questions.length / 2 ? 'Làm tốt lắm! 👍' : 'Cần cố gắng thêm! 💪'}
              </h2>
              <p className="score-desc">Bạn đã hoàn thành bài thi trắc nghiệm.</p>
              <button className="btn btn-primary" onClick={handleReset}>
                Thử Lại Lần Nữa
              </button>
            </div>
          ) : (
            <div>
              <div className="quiz-meta">
                <span>CÂU HỎI {currentIndex + 1} / {questions.length}</span>
                <span>Điểm số: {score}</span>
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <h2 className="question-text">{currentQuiz.question}</h2>

              <div className="options-list">
                {currentQuiz.answers.map((answer, index) => {
                  let optionClass = '';
                  if (selectedAnswer === answer) optionClass = 'selected';
                  if (isChecked) {
                    if (answer === currentQuiz.correctAnswer) optionClass = 'correct';
                    else if (selectedAnswer === answer) optionClass = 'incorrect';
                    else optionClass = 'disabled';
                  }

                  return (
                    <label
                      key={index}
                      className={`option-item ${optionClass}`}
                    >
                      <input
                        type="radio"
                        name="quiz-options"
                        value={answer}
                        disabled={isChecked}
                        checked={selectedAnswer === answer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="choice-radio-input"
                      />
                      <span className="option-input"></span>
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{answer}</span>
                    </label>
                  );
                })}
              </div>

              {isChecked && (
                <div className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <span>{isCorrect ? '✓ Đáp án chính xác!' : `✗ Sai rồi! Đáp án đúng là: ${currentQuiz.correctAnswer}`}</span>
                </div>
              )}

              <button className="btn btn-primary" onClick={handleAction}>
                {isChecked ? 'Câu Tiếp Theo' : 'Kiểm Tra Kết Quả'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Create Tab */}
      {activeTab === 'create' && (
        <div className="quiz-card">
          <h2 className="form-title">Tạo câu hỏi trắc nghiệm mới</h2>
          
          {errorMessage && (
            <div className="feedback-box incorrect">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="success-alert">
              <span>✨ {successMessage}</span>
            </div>
          )}

          <form onSubmit={handleCreateQuestion}>
            <div className="form-group">
              <label className="form-label" htmlFor="question-text">Nội dung câu hỏi</label>
              <textarea
                id="question-text"
                rows="3"
                className="form-input"
                placeholder="Nhập câu hỏi tại đây..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Các phương án trả lời & Tích chọn đáp án đúng</label>
              <div className="choices-setup">
                {newAnswers.map((answer, index) => (
                  <div key={index} className="choice-setup-row">
                    <input
                      type="radio"
                      name="correct-choice-selection"
                      id={`correct-choice-${index}`}
                      checked={correctAnswerIndex === index}
                      onChange={() => setCorrectAnswerIndex(index)}
                      className="choice-radio-input"
                    />
                    <label
                      htmlFor={`correct-choice-${index}`}
                      className="choice-radio-label"
                      title="Chọn đây là đáp án đúng"
                    >
                      {String.fromCharCode(65 + index)}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={`Phương án ${String.fromCharCode(65 + index)}...`}
                      value={answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              💾 Lưu Câu Hỏi
            </button>
          </form>
        </div>
      )}

    </div>
  );
}