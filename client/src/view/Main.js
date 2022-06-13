import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

import { useCookies } from 'react-cookie';
import { Button } from '@material-ui/core';
import TopViewReport from '../component/TopViewReport';
import './Main.css'

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

const Main = () => {
    const navigate = useNavigate();
    
    const [bookReportCount, setBookReportCount] = useState("0")
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // 내가 쓴 독후감
    useEffect(() => {
        axios.get('/db/users/bookreports/' + cookies?.user?.userId).then((res) => {
                // console.log(res.data)
                setBookReportCount(res.data.data?.length || 0)
            }).catch((e) => {
                console.log(e)
            })
            // eslint-disable-next-line
    }, [])
    

    const onClickBook = (book_label) => {
        alert(book_label)
    }

    return (
        <Wrapper>
            <h3>★ 인기 독후감(조회수 TOP10) ★</h3>
            <TopViewReport></TopViewReport>
        </Wrapper>
    )
};
//{booksRender()}
export default Main;
/*
            <div className="shortReport-area" >
                <div className="recommended-books">
                    <h3>★ 인기 독후감 ★</h3>
                    <div className="books">
                        <TopViewReport></TopViewReport>
                    </div>
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
                </div>
*/