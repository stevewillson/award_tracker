import React from 'react';
import Header from '../components/layout/Header';
import AwardTracker from '../components/Awards/AwardTracker';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <AwardTracker />
    </div>
  );
}

export default App;