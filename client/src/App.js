import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import About from './About';
import Home from './Home';
import { Button } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={() => {
          fetch('/api/data')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });
        }}>get data</Button>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path = "/*"
          element={ <div>
            <h2>이 페이지는 존재하지 않습니다:</h2>
            <p>{useLocation().pathname}</p>
          </div>}
        />
      </Routes>
    </div>
  );
}

export default App;