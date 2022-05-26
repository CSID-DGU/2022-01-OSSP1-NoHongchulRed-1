import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
    width: 70rem;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 0.5rem 0.5rem 2rem;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Spacing = styled.div`
    width: 100%;
    height: 10px;
`;

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

//isbn과 userid를 받아 책 정보와 독후감 정보를 출력함
const ViewReportPage = () => {
    const classes = useStyles();
    const { state } = useLocation(); //isbn과 userid를 받아옴

    const [bookInfo, setBookInfo] = useState({
        authors: '',
        isbn: '',
        publisher: '',
        thumbnail: '',
        title: ''
    });

    const onSetBookInfo = (data) => {
        setBookInfo({
             authors: data.authors,
             isbn: data.isbn,
             publisher: data.publisher,
             thumbnail: data.thumbnail,
             title: data.title
        })
     };

    console.log("독후감정보확인 페이지에서 state 출력: ", state);

    //독후감 데이터 임의로 설정
    const exampleReport =  {
        contents: "임시데이터(아직 데이터를 받지 않았습니다!!)",
        date: "2022-05-23T02:46:33.000Z",
        id: 8,
        isbn: "8924045458",
        rating: 4,
        title: "시간의 시집을 읽고",
        userid: "lin"
    };


    /* 
    //isbn, userid로 독후감 데이터를 받아옴
    useEffect(() => {
        try {
            axios.get(' ' +  )
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log("data: ", data); //받은 독후감 데이터 확인
                console.log("data.title", data.title);
            });
        } catch (err) {
            console.log(err);
        }
    }, [])
    */

    //console.log(state.isbn.isbn);
    const bookIsbn = state.isbn.isbn;

    //isbn으로 책 데이터를 받아옴
    useEffect(() => {
        try {
            axios.get('/db/books/' + bookIsbn)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log("data: ", data);
                onSetBookInfo(data);
            });
        } catch (err) {
            console.log(err);
        }
    }, [])

    //material ui 출력 형식에 맞게 조절
    const dateFormat = exampleReport.date.substr(0,16);

    return(
        <Wrapper>
            <h3> 📕책정보📕</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="filled-read-only-input"
                        label="책 제목"
                        value={bookInfo.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="저자"
                        value={bookInfo.authors}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="출판사"
                        value={bookInfo.publisher}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </div>
                <h3> 📖독후감 정보📖</h3>
                <div>
                <TextField 
                    id="outlined-search" 
                    label="독후감 제목" 
                    type="search"
                    style ={{width: '98%'}} 
                    value={exampleReport.title}
                    variant="outlined" />
                <TextField
                    id="datetime-local"
                    label="작성 날짜"
                    type="datetime-local"
                    defaultValue={dateFormat}
                    className={classes.textField}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="별점(1~10)"
                    type="number"
                    value={exampleReport.rating}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                </div>
                <h3>📌내용📌</h3>
                <div>
                    <TextField 
                    id="outlined-basic" 
                    style ={{width: '98%'}} 
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                    placeholder="자유롭게 작성해 주세요" 
                    value={exampleReport.contents}
                    variant="outlined" 
                    />
                </div>
            </form>
            <Spacing/>
        </Wrapper>
    );
}

export default ViewReportPage;