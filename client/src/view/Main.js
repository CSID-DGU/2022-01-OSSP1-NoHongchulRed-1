import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie';

import { Button } from '@material-ui/core';

import book1 from '../image/book1.jpg'
import book2 from '../image/book2.jpg'
import book3 from '../image/book3.jpg'
import './Main.css'

const Main = () => {
    const navigate = useNavigate();
    
    const [bookReportCount, setBookReportCount] = useState("0")
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // 내가 쓴 독후감
    useEffect(() => {
        axios.get('/db/users/bookreports/' + cookies?.user?.userId).then((res) => {
                // console.log(res.data)
                setBookReportCount(res.data.data.length)
            }).catch((e) => {
                console.log(e)
            })
            // eslint-disable-next-line
    }, [])
    

    const onClickBook = (book_label) => {
        alert(book_label)
    }

    const booksRender = () => {
        const renderResult = [];
        for (let i = 0; i < 3; i++) {
            const book = i % 3 === 0 ? book1 : i % 3 === 1 ? book2 : book3
            const book_label = i % 3 === 0 ? "반창고" : i % 3 === 1 ? "자랑의 기술" : "달러구트 꿈 백화점"
            renderResult.push(<div key={i} className="book" onClick={() => {onClickBook(book_label)}}><img key={i} src={book} alt={book_label} /><label>{book_label}</label></div>)
        }
        return renderResult;
    }
    return (
        <>
            <div className="main-area">
                <div className="recommended-books">
                    <span>★ {cookies?.user?.nickName} 님을 위한 추천 도서 BEST 3 ★</span>
                    <div className="books">
                        {booksRender()}
                    </div>
                </div>
                <div className="right-box">
                    <div className="user-profile">
                        <div>
                            <h3>{cookies?.user?.nickName} 님</h3>
                        </div>
                        <div>
                            <label>내가 쓴 독후감</label>
                            <label>{bookReportCount}</label>
                        </div>
                        
                        <Button variant="outlined" color="primary" onClick={() => navigate('/userEdit')}>내 정보 수정</Button>
                    </div>
                    {/* <div className="write-bookReport">
                        <Button variant="contained" color="secondary" onClick={() => navigate('/EditPage')}>독후감 작성하기</Button>
                    </div> */}
                </div>
            </div>
        </>
    )
};

export default Main;