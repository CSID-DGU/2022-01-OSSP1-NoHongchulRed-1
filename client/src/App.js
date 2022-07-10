import React from 'react';
import Header from './component/Header';
import SetRoute from './component/SetRoute';
import Nav from './component/Nav';
import Footer from './component/Footer';

import './App.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Nav />
      <SetRoute />
      <Footer />
    </div>
  );
}

export default App;