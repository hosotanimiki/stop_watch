// アプリ全体でのルーティングの設定

// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//追記ルーティング用
//画面
import LoginForm from './components/LoginForm';
import StopwatchForm from './components/StopwatchForm';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={LoginForm}/>
        <Route path='/stopwatch' Component={StopwatchForm}/>
        <Route path='/' exact Component={LoginForm}/>
      </Routes>
    </Router>
  );
}

export default App;
