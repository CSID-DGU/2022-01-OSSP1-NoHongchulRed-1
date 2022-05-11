import React from 'react';
import { useState } from 'react';
//import { TextField, Button } from "@material-ui/core";
import MultipleBookSearch from '../component/MultipleBookSearch';
import Header from '../component/Header';
import SearchResultCard from '../component/SearchResultCard';
import styled from 'styled-components'; //CSS-IN_JS
import Search from '../component/Search';

//검색 결과 나열을 스타일링
//당장은 flex로 검색 결과들을 보여주는데 grid로 바꿀 예정
const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 30px;
    padding: 30px;
`;

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

function BookSearchPage() {
    return (
        <div>
            <Header>도서 검색</Header>
            <center><MultipleBookSearch></MultipleBookSearch></center>
            <h2><center>검색 결과</center></h2>
            <Wrap>
            <SearchResultCard></SearchResultCard>
            <SearchResultCard></SearchResultCard>
            <SearchResultCard></SearchResultCard>
            <SearchResultCard></SearchResultCard>
            <SearchResultCard></SearchResultCard>
            <SearchResultCard></SearchResultCard>
            <SearchResultCard></SearchResultCard>
            </Wrap>
        </div>
    )
}

export default BookSearchPage