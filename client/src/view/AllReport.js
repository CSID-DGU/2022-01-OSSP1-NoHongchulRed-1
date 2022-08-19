import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../component/ShortReport.css'

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

const AllReport = () => {
    const [reportList, setReportList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('/api/db/bookreports/new')
            .then((res) => {
                setReportList(res.data.data || [])
            })
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <Wrapper>
            <div className="shortReport-area" >
                {reportList.length ? reportList.map((data, index) => {
                    return (
                        <div className="report-box" key={index} onClick = {() => {
                            navigate('/ViewReportPage', {state: {isbn: data.isbn, userid: data.userid}});
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
        </Wrapper>
    )
};

export default AllReport; 