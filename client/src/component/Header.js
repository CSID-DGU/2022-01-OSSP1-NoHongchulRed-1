import React from 'react';
import styled from 'styled-components'; //CSS-IN_JS
import Logo from "../image/logo.png"; //로고 이미지
import { TextField, Button } from "@material-ui/core"; //버튼

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

//padding-left: 1rem;
//background: yellow로 헤더 영역과 요소들 위치 확인
const Positioner = styled.div`
    position: sticky;
    top: 0px;
    width: 100%;
    background: yellow;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;

    padding-right: 1rem;

`;

/*
// 로고
const Logo = styled.image`
    width: 30px;
    height: 30px;
    margin: 15px;
`;
*/

//헤더 가운데 제목
const Title = styled.div`
    font-size: 2rem;
    letter-spacing: 2px;
    background: white;

`;

/*
const Button = styled.button`
    background: yellow;
    width: 30px;
    height: 30px;
`;
*/

const Dummy = styled.div`
    background-color: black;
`;

const Header = ({children}) => {
    return (
        <div>
        <Spacing></Spacing>
        <Positioner>
            <img src = {Logo} alt="logo-img"/>
            <Title>{children}</Title>
            <Button variant="contained" color="primary">Log out</Button>   
        </Positioner>
        <Spacing></Spacing>
        </div>
    );
};

export default Header;