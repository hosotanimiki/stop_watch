// アプリ全体でのルーティングの設定

// import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; //追記ルーティング用

//画面
import LoginForm from './components/LoginForm';
import StopwatchForm from './components/StopwatchForm';



function App() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  console.log(isAuthenticated)
  useEffect(() => {
    // localStorageから認証トークンを取得
    const token = localStorage.getItem('authToken');
    console.log('authToken', token)
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm/>} />
        <Route  path='/stopwatch'  element={isAuthenticated ? <StopwatchForm /> : <Navigate to="/login" />}/>
        <Route path='/' exact element={<LoginForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
