import React from 'react';
import './GatherReport.css'
import { useNavigate } from 'react-router-dom';

const GatherReport = ({contents, date, isbn, bookTitle, userid, reportTitle}) => {
    console.log("GatherReport.js isbn: ", isbn);
    const navigate = useNavigate();

    return (
        <div className="shortReport-area" onClick={() => {
            navigate('/ViewReportPage', {state: {isbn: {isbn}, userid: {userid}}});  
        }}>
            <div className="report-box">
                <div className="title">
                    <div className="user-info">
                        <label>{userid}</label>
                        <label>{date.substr(2,8)}</label>
                    </div>
                    <div className="book-info">
                        <label>{reportTitle}</label>
                        <label>{bookTitle}</label>
                    </div>
                </div>
                <div className="content">
                    <label>{contents}</label>
                </div>
            </div>
        </div>
    )
};

export default GatherReport; 