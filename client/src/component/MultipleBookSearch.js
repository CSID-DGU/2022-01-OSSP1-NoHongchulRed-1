import React from 'react';
import { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import BookSearchPage from '../view/BookSearchPage';
import { useNavigate } from 'react-router';

const Search = () => {
    const [text, setText] = useState('')
    const [books, setBooks] = useState([]);

    const onChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div>
            <TextField label="책 제목으로 검색" variant="outlined" size="small" onChange={onChange} />

            <Button variant="contained" color="default" size ="medium" onClick={() => {
            fetch('/kakao/search/multiple/' + text)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data 출력 ▼");
                console.log(data);
                console.log("data.documents 출력 ▼");
                console.log(data.documents);
                console.log("출판사 가져오기: " + data.documents[0].publisher);
                setBooks(data.documents);
                console.log(books);
                
            });
            }}>검색</Button>
        </div>
    );
};
//const navigate = useNavigate();
//navigate('../view/BookSearchPage', {state: data.documnets});

export default Search;