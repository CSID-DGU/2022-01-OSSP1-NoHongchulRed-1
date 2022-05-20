import React from 'react';
import { useState } from 'react';
import { TextField, IconButton, Button } from "@material-ui/core";
import BookSearchPage from '../view/BookSearchPage';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';

import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    const [text, setText] = useState('')
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const onChange = (e) => {
        setText(e.target.value);
    };

    const SendData = () => {
        fetch('/kakao/search/multiple/' + text)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                navigate('/BookSearchPage');               
            });
    }

    return (
        <form>
            <TextField 
                style={{ background: 'white', borderRadius: '4px' }} 
                label="책 제목으로 검색" 
                variant="outlined" 
                size="small" 
                onChange={onChange}
                />
            <Button 
                style={{ background: 'white', height: '40px' }} 
                variant="contained" 
                aria-label="search" 
                onClick={SendData} >

                <SearchIcon style={{ fill: "Black" }} />
            </Button>
        </form>
    );
};
//navigate('../view/BookSearchPage', {state: data.documnets});
//navigate('/BookSearchPage', {state: {authors: "출판사ㅏㅏㅏ", title: "책이름"}});
/*
    .then((data) => {
        setBooks(data);
        console.log("data 출력 ▼");
            console.log(data);
            console.log("data.documents 출력 ▼");
            console.log(data.documents);
            console.log("출판사 가져오기: " + data.documents[0].publisher);
            console.log("documents를 useState에 저장 후 books 출력 ▼");
            console.log(books);
            navigate('/BookSearchPage', {state: data});
    });
*/
export default Search;