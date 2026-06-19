import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Đảm bảo import đúng App.jsx
import './index.css' // File style mặc định nếu có

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)