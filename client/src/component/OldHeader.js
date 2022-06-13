import React from 'react';
import styled from 'styled-components'; //CSS-IN_JS
import Logo from "../image/logo.png"; //로고 이미지
import { TextField, Button } from "@material-ui/core"; //버튼
import { Link } from 'react-router-dom'
import SetRoute from './SetRoute';

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

const Wrapper = styled.div`
    width: 70rem;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 0.5rem;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

//padding-left: 1rem;
//background: yellow로 헤더 영역과 요소들 위치 확인
const Positioner = styled.div`
    position: sticky;
    top: 0px;
    width: 100%;
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

//로그아웃 버튼 클릭 시 헤더가 안보여야 됨..
const Header = ({children}) => {
    return (
        <Wrapper>

        <Positioner>
            <Link to = "/">
                <img src = {Logo} alt="logo-img"/>
            </Link>
            <Title>임시제목</Title>
            <Link to = "/LoginPage">
                <Button variant="contained" color="default">Log out</Button>   
            </Link>
        </Positioner>

        </Wrapper>
    );
};

export default Header;