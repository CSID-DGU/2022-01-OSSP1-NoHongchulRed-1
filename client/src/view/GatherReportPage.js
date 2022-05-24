import React from 'react';
import { useState } from 'react';
import { TextField, Button, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';
import Image from '../image/BookImg1.png';
import ShortReport from '../component/ShortReport';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-around;
`;

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    padding: 0rem 2rem 2rem;
`;

export default function GatherReportPage () {
    const {state} = useLocation();
    const isbn = state.isbn.isbn.substr(0,10); //isbn 10

    try {
        axios.get('/db/bookreports/' + isbn)
        .then((res) => {
            return res.data;
        })
        .then((data) => {
            console.log(data); //[data]
        });
    } catch (err) {
        console.log(err);
    }
    //받은 독후감 목록을 ShortReport.js에 넘겨줘야될듯
    
    return (
        <Wrap>
            <LeftSide>
                <img src = {state.thumbnail.thumbnail} alt="logo-img"/>
                <Spacing/>
                <TextField
                        id="filled-read-only-input"
                        label="책 제목"
                        defaultValue={state.title.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="저자"
                        defaultValue={state.authors.authors}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="출판사"
                        defaultValue={state.publisher.publisher}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="평점"
                        defaultValue="4.8"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
            </LeftSide>
            <div>
                <ShortReport/>
            </div>
        </Wrap>
    );
}