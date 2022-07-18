import React from 'react';
import { useState, useEffect } from 'react';
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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

    const [ReportInfo, setReportInfo] = useState({
        contents: '',
        isbn: '',
        rating: '',
        ReportTitle: '',
        views: '',
        date: '',
        userid: ''
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

    const onSetReportInfo = (data) => {
        setReportInfo({
            contents: data.contents,
            isbn: data.isbn,
            rating: data.rating,
            ReportTitle: data.ReportTitle,
            views: data.views,
            date: data.date,
            userid: data.userid
        })
    };

    //isbn, userid로 독후감 데이터를 받아옴
    useEffect(() => {
        try {
            axios.get('/api/db/bookreports/' + state.isbn + '/' + state.userid)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                onSetReportInfo(data);
            });
        } catch (err) {
            console.log(err);
        }
    }, [state.isbn, state.userid]);

    const bookIsbn = state.isbn;

    //isbn으로 책 데이터를 받아옴
    useEffect(() => {
        try {
            axios.get('/api/db/books/' + bookIsbn)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                onSetBookInfo(data);
            });
        } catch (err) {
            console.log(err);
        }
    }, [bookIsbn]);

    const dateFormat = ReportInfo.date;

    return(
        <Wrapper>
            <h3> 📕책정보📕</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="filled-read-only-input"
                        label="책 제목"
                        style ={{width: '57%'}} 
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
                    id="outlined-basic" 
                    label="독후감 제목" 
                    style ={{width: '98%'}} 
                    value={ReportInfo.ReportTitle}
                    variant="outlined" />
                <TextField 
                    id="outlined-basic" 
                    label="작성자" 
                    value={ReportInfo.userid}
                    variant="outlined" />
                <TextField 
                    id="outlined-basic" 
                    label="작성 날짜" 
                    value={dateFormat}
                    variant="outlined" />
                <TextField
                    id="outlined-number"
                    label="별점(1~10)"
                    type="number"
                    value={ReportInfo.rating}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField 
                    id="outlined-basic" 
                    label="조회수" 
                    value={ReportInfo.views}
                    variant="outlined" />
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
                    value={ReportInfo.contents}
                    variant="outlined" 
                    />
                </div>
            </form>
            <Spacing/>
        </Wrapper>
    );
}

export default ViewReportPage;