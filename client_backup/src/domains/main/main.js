import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { Button } from '@material-ui/core';

import Title from '../common/title'
import Nav from '../common/nav'
import Book1 from '../../assets/images/book1.jpg'
import Book2 from '../../assets/images/book2.jpg'
import Book3 from '../../assets/images/book3.jpg'
import './main.css'

const Main = () => {
    const navigate = useNavigate();

    const booksRender = () => {
        const renderResult = [];
        for (let i = 0; i < 3; i++) {
            const book = i % 3 === 0 ? Book1 : i % 3 === 1 ? Book2 : Book3
            const book_label = i % 3 === 0 ? "반창고" : i % 3 === 1 ? "자랑의 기술" : "달러구트 꿈 백화점"
            renderResult.push(<div className="book"><img key={i} src={book} /><label>{book_label}</label></div>)
        }
        return renderResult;
    }

    return (
        <>
            <Title />
            <Nav />
            <div className="main-area">
                <div className="recommended-books">
                    <span>★ 박철수 님을 위한 추천 도서 BEST 3 ★</span>
                    <div className="books">
                        {booksRender()}
                    </div>
                </div>
                <div className="right-box">
                    <div className="user-profile">
                        <div>
                            <h3>박철수 님</h3>
                            <Button variant="contained" onClick={() => {alert("로그아웃 되었습니다");navigate('/')}}>Logout</Button>
                        </div>
                        <div>
                            <label>내가 쓴 독후감</label><label>3</label>
                        </div>
                        
                        <Button variant="outlined" color="primary" onClick={() => navigate('/userEdit')}>내 정보 수정</Button>
                    </div>
                    <div className="write-bookReport">
                        <Button variant="contained" color="secondary">독후감 작성하기</Button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Main;