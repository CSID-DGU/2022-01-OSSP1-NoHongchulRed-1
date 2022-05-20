import React from 'react';
import { useState } from 'react';
//import { TextField, Button } from "@material-ui/core";
import MultipleBookSearch from '../component/MultipleBookSearch';
import SearchResultCard from '../component/SearchResultCard';
import styled from 'styled-components'; //CSS-IN_JS
import { useLocation } from 'react-router';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
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

function BookSearchPage() {
  const { state } = useLocation();
  console.log("결과페이지에서 documents[0].publisher 출력 ▼");
  console.log(state.documents[0].publisher);
    
    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <div>          
=======

        <div> 
>>>>>>> 009ba244c4e631e089b4593b0b2cbb21602b0a6b
            <Wrapper>
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
            </Wrapper>
        </div>
    );
<<<<<<< HEAD
=======
      <div>
          <Wrapper>
              {state.documents.map((data, index) => {
                  return (
                      <div key={index}>
                          <SearchResultCard 
                            thumbnail = {data.thumbnail}
                            title={data.title} 
                            authors= {data.authors}
                            publisher={data.publisher}
                            datetime={data.datetime}
                             >
                          </SearchResultCard>
                      </div>
                  )
              })}
          </Wrapper>
      </div>
  )
>>>>>>> parent of 009ba24 (Merge branch 'master' into front/main)
=======

>>>>>>> 009ba244c4e631e089b4593b0b2cbb21602b0a6b
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


export default BookSearchPage;