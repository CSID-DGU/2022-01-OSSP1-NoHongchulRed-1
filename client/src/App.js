import React from 'react';
import Header from './component/Header';
import SetRoute from './component/SetRoute';
import Nav from './component/Nav';

import './App.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Nav />
      <SetRoute />
    </div>
  );
}

export default App;