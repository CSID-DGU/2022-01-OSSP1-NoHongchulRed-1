import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './ShortReport.css'

const Main = (props) => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [reportList, setReportList] = useState([])

    useEffect(() => {
        axios.get('/db/books/bookreports/' + props.isbn)
            .then((res) => {
                console.log(props.isbn)
                console.log(res.data);
                console.log(res.data.data);
                setReportList(res.data.data || [])
            })
            .catch((e) => {
                console.log(e);
            });
            // eslint-disable-next-line
    }, [])

    return (
        <div className="shortReport-area">
            {reportList.length ? reportList.map((data, index) => {
                return (
                    <div className="report-box" key={index}>
                        <div className="title">
                            <p className="bookTitle">{data.title}</p>
                            <p className="reportTitle">{data.ReportTitle}</p>
                            <p className="nickName">{cookies?.user?.nickName}</p>
                            <p className="date">{data.date}</p>
                        </div>
                        <div className="content">
                            <label>{data.contents}</label>
                        </div>
                    </div>
                )
            }) : "등록된 독후감이 없습니다."
            }
        </div>
    )
};

export default Main; 