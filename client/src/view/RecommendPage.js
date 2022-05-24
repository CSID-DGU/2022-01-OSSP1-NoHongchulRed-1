import React from 'react';
import { useState, useEffect } from 'react';
//import { TextField, Button } from "@material-ui/core";
import styled from 'styled-components'; //CSS-IN_JS
import Image from '../image/BookImg1.png';
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 70rem;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 2rem 0.5rem 2rem;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

const BookWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BookList = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
`;
//    
const RecommendPage = () => {
    const [userSession, setUserSession] = useState({
        id: '',
        nickname: ''
      });
    
    useEffect(()=>{
        try {
          axios.get('/session')
          .then((res) => {
              return res.data;
          })
          .then((data) => {
              // 세션을 data로 넘겨주었으므로 해당 내용으로 설정
              console.log(data) //data 확인용 코드
              setUserSession({
                  ...userSession,
                  id: data.userId,
                  nickname: data.nickname
              });
          });
        } catch (err) {
            console.log(err)
        }
    },[]) //무한루프를 막음 (,[]이 없으면 무한루프)

    return(
        <Wrapper>
            <h2>⭐{userSession.nickname}님을 위한 추천 도서⭐</h2>
            <Spacing />
            <BookList>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책1</h3></BookWrap>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책2</h3></BookWrap>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책3</h3></BookWrap>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책4</h3></BookWrap>                
            </BookList>
        </Wrapper>
    );
}

export default RecommendPage;