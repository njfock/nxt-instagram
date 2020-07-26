import React from 'react';
import './App.css';
import Header from './components/Header';
import Intro from './components/Intro';

function App() {
  return (
    <div className="App">
      <Header/>
      <Intro />
      <Intro text='Nexthor'/>
    </div>
  );
}

export default App;
