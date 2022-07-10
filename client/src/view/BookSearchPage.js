import React from 'react';
import { useState, useEffect } from 'react';
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

function BookSearchPage() {
  const { state } = useLocation();
  const [books, setBooks] = useState([])

  useEffect(() => {
    setBooks(state?.documents ? state.documents : [])
  }, [state]);
    
    return (
      <div>
          <Wrapper>
              {books.length ? books.map((data, index) => {
                  return (
                      <div key={index}>
                          <SearchResultCard 
                            thumbnail = {data.thumbnail}
                            title={data.title} 
                            authors= {data.authors}
                            publisher={data.publisher}
                            datetime={data.datetime}
                            isbn={data.isbn}
                             >
                          </SearchResultCard>
                      </div>
                  )
              }) : "검색된 책이 없습니다."}
          </Wrapper>
      </div>
  )
}

export default BookSearchPage;