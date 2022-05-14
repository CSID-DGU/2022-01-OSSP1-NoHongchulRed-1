import * as React from 'react';
import { BrowserRouter, Route, Routes, useLocation, Link } from 'react-router-dom';

import EditPage from '../view/EditPage';
import BookSearchPage from '../view/BookSearchPage';
import About from '../About';
import Main from '../view/Main';
import LoginPage from '../view/LoginPage';

//Route 관리 파일
const SetRoute = () => {
  return (
    
      <Routes>
        <Route exact={true} path="/" element={<Main/>} />
        <Route exact path="/EditPage" element={<EditPage />} />
        <Route exact path="/BookSearchPage" element={<BookSearchPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/LoginPage" element={<LoginPage />} />
        <Route
          path = "/*"
          element={ <div>
            <h2>이 페이지는 존재하지 않습니다:</h2>
            <p>{useLocation().pathname}</p>
          </div>}
        />
      </Routes>
      
  );
};

export default SetRoute;