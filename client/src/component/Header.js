import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MultipleBookSearch from './MultipleBookSearch';
import { Button } from "@material-ui/core";
import styled from 'styled-components'; //CSS-IN_JS
import './Header.css'

//background-color: yellow;
const Spacing = styled.div`
    width: 10%;
    height: 30px;
`;

const Header = () => {
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const path = window.location.pathname;
    if (path === '/' || path==='/SignUp') return null; /*로그인, 회원가입 페이지에서 Nav 숨기기 */

    return (
        <div className="title-area" >
            <ImportContactsIcon fontSize='large'/>
            <div onClick={() => navigate('/Main')}>
                <h2>Read</h2>
                <h2>Lead</h2>
            </div>
            <Spacing />
            <div>
                <MultipleBookSearch />
            </div>
            <Spacing />
            <Button variant="contained" onClick={() => {

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

                }}>로그아웃</Button>
            {/* <div><Button variant="contained" color="default">log out</Button></div> */}
        </div>
    )
};

export default Header; 