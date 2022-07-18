import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShortReport.css'


const Main = (props) => {
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/db/books/bookreports/' + props.isbn)
        .then((res) => {
            setReportList(res.data.data || [])
        })
        .catch((err) => {
            console.log(err);
        });
    }, [props.isbn]);

    return (
        <div className="shortReport-area" >
            {reportList.length ? reportList.map((data, index) => {
                return (
                    <div className="report-box" key={index} onClick = {() => {
                        navigate('/ViewReportPage', {state: {isbn: props.isbn, userid: data.userid}});
                    }}>
                        <div className="title">
                            <p className="bookTitle">{data.title}</p>
                            <p className="reportTitle">{data.ReportTitle}</p>
                            <p className="nickName">⭐{data.rating} | {data.userid}</p>
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