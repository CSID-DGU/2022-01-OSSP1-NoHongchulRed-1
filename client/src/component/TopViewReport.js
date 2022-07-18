import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TopViewReport.css';
//이상하게 ShortReport.css 적용이 되어서 css 클래스 이름을 바꿔야지 TopViewReport.css 효과 적용됨.

const TopViewReport = (props) => {
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('/api/db/bookreports/view')
            .then((res) => {
                setReportList(res.data.data || []);
            })
        } catch (err) {
            console.log(err);
        }
    }, []);
    
    return (
        <div className="Report-area" >
            {reportList.length ? reportList.slice(0,10).map((data, index) => { //배열 앞의 10개만 출력
                return (
                    <div className="report-box" key={index} onClick = {() => {
                        navigate('/ViewReportPage', {state: {isbn: data.isbn, userid: data.userid}});
                    }}>
                        <div className="title">
                            <p className="centerBookTitle">{data.title}</p>
                            <p className="centerReportTitle">{data.ReportTitle}</p>
                            <p className="nickName">⭐{data.rating} | {data.userid}</p>
                            <p className="date">{data.date}</p>
                        </div>
                        <div className="bookContent">
                            <img src={data.thumbnail} alt="thumbnail"/>
                        </div>
                    </div>
                )
            }) : "등록된 독후감이 없습니다."
            }
        </div>
    )
};

export default TopViewReport;