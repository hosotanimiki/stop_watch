import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/watchapp/login/')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
          <LoginForm />
      </div>
    </div>
  );
}

export default App;
