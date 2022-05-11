import React from 'react';
import { useState } from 'react';
import { TextField, Button } from "@material-ui/core";

const Search = () => {
    const [text, setText] = useState('')

    const onChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div>
            <TextField label="책 제목으로 검색" variant="outlined" onChange={onChange} />

            <Button variant="contained" color="primary" onClick={() => {
            fetch('/kakao/search/multiple/' + text)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
            }}>get multiple book data</Button>
        </div>
    );
};

export default Search;