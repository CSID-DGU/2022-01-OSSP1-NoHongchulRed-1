import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { Button } from '@material-ui/core';
import TopViewReport from '../component/TopViewReport';
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
        <>
            <div className="main-area">
                <div className="recommended-books">
                    <span><br/>★ 인기 독후감 ★</span>
                    <div className="books">
                        <TopViewReport></TopViewReport>
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
            </div>
        </>
    )
};
//{booksRender()}
export default Main;