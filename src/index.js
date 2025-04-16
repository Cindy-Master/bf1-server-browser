// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // 导入 BrowserRouter
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* 使用 BrowserRouter 包裹 App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
