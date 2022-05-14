import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'

// import { Button } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';

import Title from '../common/title'
import Nav from '../common/nav'
import './shortReport.css'

const tempParmas = [
    {
        nickName: '닉네임',
        date: '22/3/10 5:10',
        bookTitle: '책 제목',
        reportTitle: '독후감 제목',
        content: '붙잡아 같은 그들을 눈에 그들은 불러 원대하고, 보이는 내는 부패뿐이다. 싶이 일월과 하는 주며, 이것이야말로 고행을 투명하되 속에서 운다. 그들의 생생하며, 꾸며 오아이스도 방지하는 이상 실로 노래하며 것이다. 발휘하기 새 트고, 아니더면, 설레는 가는 같으며, 보내는 힘있다.'
    },
    {
        nickName: '닉네임',
        date: '22/3/10 5:10',
        bookTitle: '책 제목',
        reportTitle: '독후감 제목',
        content: '붙잡아 같은 그들을 눈에 그들은 불러 원대하고, 보이는 내는 부패뿐이다. 싶이 일월과 하는 주며, 이것이야말로 고행을 투명하되 속에서 운다. 그들의 생생하며, 꾸며 오아이스도 방지하는 이상 실로 노래하며 것이다. 발휘하기 새 트고, 아니더면, 설레는 가는 같으며, 보내는 힘있다.'
    },
    {
        nickName: '닉네임',
        date: '22/3/10 5:10',
        bookTitle: '책 제목',
        reportTitle: '독후감 제목',
        content: '붙잡아 같은 그들을 눈에 그들은 불러 원대하고, 보이는 내는 부패뿐이다. 싶이 일월과 하는 주며, 이것이야말로 고행을 투명하되 속에서 운다. 그들의 생생하며, 꾸며 오아이스도 방지하는 이상 실로 노래하며 것이다. 발휘하기 새 트고, 아니더면, 설레는 가는 같으며, 보내는 힘있다.'
    }
]
const Main = () => {
    const [reportList, setReportList] = useState(tempParmas)

    useEffect(() => {
        // 이쪽에 Axios 하시면됩니다.
        
        // Axios.get('/api').then(function (response) {
        //     console.log(response);
        //     setReportList(response.data)
        // }).catch((err) => { console.log(err) });
    }, [])

    return (
        <>
            <Title />
            <Nav />
            <div className="shortReport-area">
                {reportList.map((data, index) => {
                    return (
                        <div className="report-box" key={index}>
                            <div className="title">
                                <div className="user-info">
                                    <label>{data.nickName}</label>
                                    <label>{data.date}</label>
                                </div>
                                <div className="book-info">
                                    <label>{data.bookTitle}</label>
                                    <label>{data.reportTitle}</label>
                                </div>
                            </div>
                            <div className="content">
                                <label>{data.content}</label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Main;