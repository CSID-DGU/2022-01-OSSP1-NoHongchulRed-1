import React from 'react';
import { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const Search = () => {
    const [text, setText] = useState('')
    const navigate = useNavigate();

    const onChange = (e) => {
        setText(e.target.value);
    };
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            SendData();
          }      
    }

    const SendData = () => {
        if (text === "") {
            alert("책 제목을 입력해주세요.")
        }
        else {
            axios.get('/api/kakao/search/multiple/' + text)
            .then((res) => {
                navigate('/BookSearchPage', {state: res.data}); 
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <form onSubmit={e => { e.preventDefault(); }}>
            <TextField 
                style={{ background: 'white', borderRadius: '4px' }} 
                label="책 제목으로 검색" 
                variant="outlined" 
                size="small" 
                onChange={onChange}
                onKeyDown={onKeyDown}
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

export default Search;