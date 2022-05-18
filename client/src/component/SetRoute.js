import * as React from 'react';
import { BrowserRouter, Route, Routes, useLocation, Link } from 'react-router-dom';

import EditPage from '../view/EditPage';
import BookSearchPage from '../view/BookSearchPage';
// import About from '../About';
// import Main from '../view/Main';
import LoginPage from '../view/LoginPage';

// import { Route, Routes, useLocation } from 'react-router-dom';
import About from '../About';
import SignIn from '../domains/sign-in/SignIn';
import SignUp from '../domains/sign-up/SignUp';
import Main from '../view/Main';
import ShortReport from '../domains/short-report/ShortReport';
import UserEdit from '../domains/user-edit/UserEdit';

// import Search from './Search'
import '../App.css'

//Route 관리 파일
const SetRoute = () => {
  return (
    
      <Routes>
        <Route path = "/" element={<SignIn />} />
        <Route path = "/Signup" element={<SignUp />} />
        <Route path = "/Main" element={<Main />} />
        <Route path = "/ShortReport" element={<ShortReport />} />
        <Route path = "/UserEdit" element={<UserEdit />} />
        
        {/* <Route path = "/about" element={<About />} />
        <Route path = "/search" element={<Search />} /> */}
        {/* <Route path = "/login" element={<Login />} /> */}
        <Route path = "/*" element={ <div><h2>이 페이지는 존재하지 않습니다:</h2><p>{useLocation().pathname}</p></div>}
        />

        
        <Route exact path="/EditPage" element={<EditPage />} />
        <Route exact path="/BookSearchPage" element={<BookSearchPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/LoginPage" element={<LoginPage />} />
        
      </Routes>
      
  );
};

export default SetRoute;