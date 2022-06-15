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
            <TextField label="검색어" variant="outlined" onChange={onChange} />
            <br /><br />
            <Button variant="contained" color="primary" onClick={() => {
            fetch('/api/data')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //console.log(data);
            });
            }}>get test data</Button>
            <Button variant="contained" color="primary" onClick={() => {
            fetch('/kakao/search/single/' + text)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //console.log(data);
            });
            }}>get single book data</Button>
            <Button variant="contained" color="primary" onClick={() => {
            fetch('/kakao/search/multiple/' + text)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //console.log(data);
            });
            }}>get multiple book data</Button>
            <Button variant="contained" color="primary" onClick={() => {
            fetch('/db/' + text)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //console.log(data);
            });
            }}>get user data</Button>
        </div>
    );
};

export default Search;