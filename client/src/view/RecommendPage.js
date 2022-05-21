import React from 'react';
import { useState } from 'react';
//import { TextField, Button } from "@material-ui/core";
import styled from 'styled-components'; //CSS-IN_JS
import Image from '../image/bookImg1.png';

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

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

const BookWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BookList = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
`;
//    
const RecommendPage = () => {
    return(
        <Wrapper>
            <h2>⭐박철수님을 위한 추천 도서⭐</h2>
            <Spacing />
            <BookList>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책1</h3></BookWrap>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책2</h3></BookWrap>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책3</h3></BookWrap>
                <BookWrap><img src = {Image} alt="book-img"/><h3>책4</h3></BookWrap>                
            </BookList>
        </Wrapper>
    );
}

export default RecommendPage;