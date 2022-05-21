import React from 'react';
import { useState } from 'react';
import { TextField, Button, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';
import Image from '../image/bookImg1.png';
import ShortReport from '../domains/short-report/ShortReport';
import { useLocation } from 'react-router-dom';

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