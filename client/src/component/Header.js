import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MultipleBookSearch from './MultipleBookSearch';
import { Button } from "@material-ui/core";
import styled from 'styled-components'; //CSS-IN_JS
import './Header.css'

const Spacing = styled.div`
    width: 5%;
    height: 30px;
`;

//background-color: #fcc879; #fff6b0; #ffdeab;
const MyInfo = styled.div`
    width: 25%;
    height: 40px;
    background-color: #ffdeab;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.16);
    font-size: 1rem;
`;

const Header = () => {
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

    const path = window.location.pathname;
    if (path === '/' || path==='/SignUp') return null; /*로그인, 회원가입 페이지에서 Nav 숨기기 */

    return (
        <div className="title-area" >
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
                    axios.get('/db/users/logout')
                        .then((res) => {
                            return res.data;
                        })
                        .then((data) => {
                            // 세션을 data로 넘겨주었으므로 해당 내용으로 설정
                            console.log(data)
                            alert("로그아웃 되었습니다");
                            navigate('/');
                            removeCookie('user');
                        }).catch((e) => {
                            console.log(e)
                            alert('로그아웃에 실패했습니다.')
                        })
                }}>&nbsp;&nbsp;로그아웃</div>
            </MyInfo>

        </div>
    )
};
//Button variant="contained"
export default Header; 