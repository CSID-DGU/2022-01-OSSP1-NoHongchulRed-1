import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components'; //CSS-IN_JS
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 70rem;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 0.5rem 0.5rem 2rem;
    overflow: hidden;
    overflow-x: auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default function MyBookPage() {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [reportList, setReportList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/db/users/bookreports/' + cookies?.user?.userId)
        .then((res) => {
            console.log(res.data.data);
            setReportList(res.data.data || [])
        })
        .catch((e) => {
            console.log(e);
        });
        // eslint-disable-next-line
}, [])

  return (
    <Wrapper>
    {/* <div className={classes.root}> */}

    <div className="shortReport-area">
        {reportList.length ? reportList.map((data, index) => {
            return (
                <div className="report-box" key={index} onClick = {() => {
                    navigate('/ViewReportPage', {state: {isbn: data.isbn, userid: data.userid}});
                }}>
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
    </Wrapper>
  );
}
//subtitle={<span>by: {item.author}</span>}