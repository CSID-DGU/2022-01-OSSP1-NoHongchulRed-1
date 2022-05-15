import React from 'react';
import { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';
import Image from '../image/BookImg1.png';
import ShortReport from '../component/ShortReport';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-around;
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

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    padding: 2rem 2rem 2rem;
`;

export default function GatherReportPage () {
    return (
        <Wrapper>
            <LeftSide>
                <img src = {Image} alt="logo-img"/>
                <Spacing/>
                <TextField
                        id="filled-read-only-input"
                        label="책 제목"
                        defaultValue="달러구트 꿈 백화점"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="저자"
                        defaultValue="이미예"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="출판사"
                        defaultValue="팩토리 나인"
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
                <ShortReport></ShortReport>
            </div>
        </Wrapper>
    );
}