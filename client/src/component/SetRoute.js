import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

import EditPage from '../view/EditPage';
import BookSearchPage from '../view/BookSearchPage';
import About from '../About';
import SignIn from '../view/SignIn';
import SignUp from '../view/SignUp';
import Main from '../view/Main';
import UserEdit from '../view/UserEdit';
import ViewReportPage from '../view/ViewReportPage';
import MyBookPage from '../view/MyBookPage';
import GatherReportPage from '../view/GatherReportPage';
import ShortReport from './ShortReport';
import RecommendPage from '../view/RecommendPage';
import TestDB from '../TestDB';
import AllReport from '../view/AllReport';

//Route 관리 파일
const SetRoute = () => {
  // const navigate = useNavigate();

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const path = window.location.pathname;

  if (!(path === '/' || path === '/SignUp')){
    if (!cookies?.user?.userId) {
      // if(path === '/Main' || path === '/main'){
      //   console.log(path + " pass")
      // }
      // else{
      //   window.location.href = '/';  
      //   // navigate('/');
      // }
      window.location.href = '/'; 
    }
  }
  
  return (
      <Routes>
        <Route exact={true} path="/" element={<SignIn/>} />
        <Route path = "/SignUp" element={<SignUp />} />
        <Route exact={true} path="/Main" element={<Main/>} />
        <Route path = "/UserEdit" element={<UserEdit />} />
        <Route exact path="/EditPage" element={<EditPage />} />
        <Route exact path="/BookSearchPage" element={<BookSearchPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/ViewReportPage" element={<ViewReportPage />} />
        <Route exact path="/MyBookPage" element={<MyBookPage />} />
        <Route exact path="/GatherReportPage" element={<GatherReportPage />} />
        <Route exact path="/ShortReport" element={<ShortReport />} />
        <Route exact path="/AllReport" element={<AllReport />} />
        <Route exact path="/RecommendPage" element={<RecommendPage />} />
        <Route exact path="/TestDB" element={<TestDB/>} />
        <Route
          path = "/*"
          element={ <div>
            <h2>이 페이지는 존재하지 않습니다:</h2>
            {/* <p>{useLocation().pathname}</p> */}
          </div>}
        />
      </Routes>
      
  );
};

export default SetRoute;