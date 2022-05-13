import React from 'react';
import { useState } from 'react';
//import { TextField, Button } from "@material-ui/core";
import MultipleBookSearch from '../component/MultipleBookSearch';
import Header from '../component/Header';
import SearchResultCard from '../component/SearchResultCard';
import styled from 'styled-components'; //CSS-IN_JS
import Search from '../component/Search';
import { useLocation } from 'react-router';

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
            
            <Wrap>
            <SearchResultCard thumbnail = "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5416922%3Ftimestamp%3D20220512171037"
            title="달러구트 꿈 백화점" authors="이미예" publisher="하늘출판사" datetime="2020" contents="달러구트 꿈 백화점 소개글입니다" ></SearchResultCard>
            <SearchResultCard thumbnail = "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5416922%3Ftimestamp%3D20220512171037"
            title="달러구트 꿈 백화점" authors="이미예" publisher="하늘출판사" datetime="2020" contents="달러구트 꿈 백화점 소개글입니다" ></SearchResultCard>
            <SearchResultCard thumbnail = "../image/BookImg1.png" title="달러구트 꿈 백화점" authors="이미예" 
            publisher="하늘출판사" datetime="2020" contents="달러구트 꿈 백화점 소개글입니다" ></SearchResultCard>
            <SearchResultCard thumbnail = "../image/BookImg1.png" title="달러구트 꿈 백화점" authors="이미예" 
            publisher="하늘출판사" datetime="2020" contents="달러구트 꿈 백화점 소개글입니다" ></SearchResultCard>
            <SearchResultCard thumbnail = "../image/BookImg1.png" title="달러구트 꿈 백화점" authors="이미예" 
            publisher="하늘출판사" datetime="2020" contents="달러구트 꿈 백화점 소개글입니다" ></SearchResultCard>
            </Wrap>
        </div>
    )
}

/*
//const { books } = useBooks(); 
//{ books[0].title }
//const  {books}  = useLocation();
const BookSearchPage = () => {
    const [books, setValue] = useState("");
    return (
      <div>
      <Header>도서 검색</Header>
      <center><MultipleBookSearch setValue = {setValue}></MultipleBookSearch></center>
      <h2><center>this is BookSearchPage</center></h2>
      <h2>books: {books}</h2>
      <BookListWrapper>
        {books && books.map((item, id) => {
          const { thumbnail, title, authors, publisher, datetime, contents } =
            item;
          
          return (
            <div>
              <h2>제목은 {books.documents[0].title}</h2>
            <BookItem key={id}>

                <SearchResultCard title={title} authors={authors} 
                publisher={publisher} datetime={datetime} contents={contents} ></SearchResultCard>
            </BookItem>
            </div>
          );
        })}
      </BookListWrapper>
      </div>
    );
  };
  
  const BookListWrapper = styled.li`
    display: grid;
    padding: 2ppx;
    width: 900px;
    margin: auto;
    grid-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
  `;

  const BookItem = styled.dl`
  display: flex;
  dt {
    display: block;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .bookTitle {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;
*/


export default BookSearchPage