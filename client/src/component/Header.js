import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MultipleBookSearch from './MultipleBookSearch';
import styled from 'styled-components'; //CSS-IN_JS
import './Header.css'

const Spacing = styled.div`
    width: 5%;
    height: 30px;
`;

//background-color: #fcc879; #fff6b0; #ffdeab;
const MyInfo = styled.div`
    width: 30%;
    height: 40px;
    background-color: #ffdeab;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.16);
    font-size: 1rem;
`;

const Header = () => {
    const navigate = useNavigate();

    const [bookReportCount, setBookReportCount] = useState(0)
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    axios.get('/api/db/users/bookreports/' + cookies?.user?.userId).then((res) => {
        setBookReportCount(res.data.data?.length || 0);
    }).catch((err) => {
        console.log(err);
    });

    const path = window.location.pathname;
    if (path === '/' || path==='/SignUp') return null; /*로그인, 회원가입 페이지에서 Nav 숨기기 */

    return (
        <div className="title-area">
            <ImportContactsIcon fontSize='large'/>
            <div onClick={() => navigate('/Main')}>
                <h2>Read<br/>Lead</h2>
            </div>
            <Spacing />
            <div>
                <MultipleBookSearch />
            </div>
            <Spacing />
            <MyInfo>
                <div>{cookies?.user?.nickName}님 &nbsp;| &nbsp;내가 쓴 독후감 {bookReportCount}권 &nbsp;|</div>
                <div onClick={() => {
                    axios.get('/api/db/users/logout')
                        .then((res) => {
                            return res.data;
                        })
                        .then((data) => {
                            alert("로그아웃 되었습니다");
                            removeCookie('user');
                            navigate('/');
                        }).catch((err) => {
                            alert('로그아웃에 실패했습니다.')
                        })
                }}>&nbsp;&nbsp;로그아웃</div>
            </MyInfo>
        </div>
    )
};

export default Header; 