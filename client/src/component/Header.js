import React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import './Header.css'
import MultipleBookSearch from './MultipleBookSearch';
import { Button } from "@material-ui/core";
import styled from 'styled-components'; //CSS-IN_JS

//background-color: yellow;
const Spacing = styled.div`
    width: 10%;
    height: 30px;
`;

const Header = () => {
    const navigate = useNavigate();
    const path = window.location.pathname;
    if (path === '/' || path==='/SignUp') return null; /*로그인, 회원가입 페이지에서 헤더 숨기기 */

    const onSubmitLogout = () => {
        try {
            axios.get('/db/users/logout');
        } catch (err) {
            console.log(err)
        }
        navigate('/');
    }

    return (
        <div className="title-area" >
            <ImportContactsIcon fontSize='large'/>
            <div onClick={() => navigate('/Main')}>
                <h2>Read</h2>
                <h2>Lead</h2>
            </div>
            <Spacing></Spacing>
            <div><MultipleBookSearch></MultipleBookSearch></div>
            <Spacing></Spacing>
            <div><Button variant="contained" color="default" onClick={onSubmitLogout}>log out</Button></div>
        </div>
    )
};

export default Header;