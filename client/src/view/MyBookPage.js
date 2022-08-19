import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components'; //CSS-IN_JS
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 70rem;
    height: auto;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 0.5rem 0.5rem 2rem;
    // overflow: hidden;
    // overflow-x: auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default function MyBookPage() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/db/users/bookreports/' + cookies?.user?.userId)
        .then((res) => {
            setReportList(res.data.data || [])
        })
        .catch((err) => {
            console.log(err);
        });
    }, [cookies?.user?.userId]);

  return (
    <Wrapper>
        <div className="shortReport-area">
            {reportList.length ? reportList.map((data, index) => {
                return (
                    <div className="report-box" key={index} onClick = {() => {
                        navigate('/ViewReportPage', {state: {isbn: data.isbn, userid: data.userid}});
                    }}>
                        <div className="title">
                            <p className="bookTitle">{data.title}</p>
                            <p className="reportTitle">{data.ReportTitle}</p>
                            <p className="nickName">⭐{data.rating} | {cookies?.user?.nickName}</p>
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
    </Wrapper>
  );
}