import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Search from './component/Search';
import BookSearchPage from './view/BookSearchPage';
import { Switch } from '@material-ui/core';
import Header from './component/Header';
import SetRoute from './component/SetRoute';

function App() {
  return (
    <div className="App">
      <Header></Header>

        <SetRoute/>
    </div>
  );
}

export default App;