import * as React from 'react';
import { BrowserRouter, Route, Routes, useLocation, Link } from 'react-router-dom';

import EditPage from '../view/EditPage';
import BookSearchPage from '../view/BookSearchPage';
import About from '../About';
import Main from '../view/Main';
import LoginPage from '../view/LoginPage';
import ViewReportPage from '../view/ViewReportPage';
import MyBookPage from '../view/MyBookPage';
import GatherReportPage from '../view/GatherReportPage';
import ShortReport from './ShortReport';

//Route 관리 파일
const SetRoute = () => {
  return (
    
      <Routes>
        <Route exact={true} path="/" element={<Main/>} />
        <Route exact={true} path="/Main" element={<Main/>} />
        <Route exact path="/EditPage" element={<EditPage />} />
        <Route exact path="/BookSearchPage" element={<BookSearchPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/LoginPage" element={<LoginPage />} />
        <Route exact path="/ViewReportPage" element={<ViewReportPage />} />
        <Route exact path="/MyBookPage" element={<MyBookPage />} />
        <Route exact path="/GatherReportPage" element={<GatherReportPage />} />
        <Route exact path="/ShortReport" element={<ShortReport />} />
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