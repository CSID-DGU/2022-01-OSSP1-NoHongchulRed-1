import React from 'react';
import { useState } from 'react';
//import { TextField, Button } from "@material-ui/core";
import MultipleBookSearch from '../component/MultipleBookSearch';
import Header from '../component/Header';
import SearchResultCard from '../component/SearchResultCard';
import styled from 'styled-components'; //CSS-IN_JS
import { useLocation } from 'react-router-dom';

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