import React from 'react';
import { useNavigate } from 'react-router-dom'
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

    return (
        <div className="title-area" onClick={() => navigate('/Main')}>
            <ImportContactsIcon fontSize='large'/>
            <div>
                <h2>Read</h2>
                <h2>Lead</h2>
            </div>
            <Spacing></Spacing>
            <div><MultipleBookSearch></MultipleBookSearch></div>
            <Spacing></Spacing>
            <div><Button variant="contained" color="default">log out</Button></div>
        </div>
    )
};

export default Header; 