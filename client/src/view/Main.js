import React from 'react';
import styled from 'styled-components';

import TopViewReport from '../component/TopViewReport';
import './Main.css'

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

const Main = () => {

    return (
        <Wrapper>
            <h3>★ 인기 독후감(조회수 TOP10) ★</h3>
            <TopViewReport></TopViewReport>
        </Wrapper>
    )
};

export default Main;