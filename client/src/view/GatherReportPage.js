import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';
import Image from '../image/BookImg1.png';
import GatherReport from '../component/GatherReport';
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

    useEffect(() => {
        try {
            axios.get('/db/bookreports/' + isbn)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log("[data]: ", [data]); //data
                //console.log(data[0].userid); (data가 arraylist가 아직 아니라서)
            });
        } catch (err) {
            console.log(err);
        }
    }, [])
    
    const example = [
        {
            contents: "내용123",
            date: "2022-05-23T02:46:33.000Z",
            id: 8,
            isbn: "8924045458",
            rating: 4,
            title: "시간의 시집을 읽고",
            userid: "lin"
        },
        {
            contents: "내용456",
            date: "2022-05-23T02:46:33.000Z",
            id: 9,
            isbn: "8924045458",
            rating: 5,
            title: "독후감제목입니다",
            userid: "hi000"
        }       
    ]

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
                {example.map((data, index) => {
                  return (
                      <div key={index}>
                          <GatherReport
                            contents = {data.contents}
                            date={data.date} 
                            isbn={isbn} 
                            bookTitle={state.title.title} 
                            userid={data.userid} 
                            reportTitle={data.title}
                             >
                          </GatherReport>
                      </div>
                  )
              })}
            </div>
        </Wrap>
    );
}
//<h2>(gatherReportPage)isbn: {isbn}, title: {state.title.title}</h2>
//<GatherReport isbn={isbn} title={state.title.title}/>