import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
// import About from './About';
import SignIn from './domains/sign-in/signIn';
import SignUp from './domains/sign-up/signUp';
import Main from './domains/main/main';
import ShortReport from './domains/short-report/shortReport';
import UserEdit from './domains/user-edit/userEdit';

// import Search from './Search'
import './App.css'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<SignIn />} />
        <Route path = "/signup" element={<SignUp />} />
        <Route path = "/main" element={<Main />} />
        <Route path = "/shortReport" element={<ShortReport />} />
        <Route path = "/userEdit" element={<UserEdit />} />
        
        {/* <Route path = "/about" element={<About />} />
        <Route path = "/search" element={<Search />} /> */}
        {/* <Route path = "/login" element={<Login />} /> */}
        <Route path = "/*" element={ <div><h2>이 페이지는 존재하지 않습니다:</h2><p>{useLocation().pathname}</p></div>}
        />
      </Routes>
    </div>
  );
}

export default App;