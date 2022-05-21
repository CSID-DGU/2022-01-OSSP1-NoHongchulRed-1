import React from 'react';
import { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';
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


 /*
    //받아온 정보 확인용 코드
    console.log("현재 EditPage - SearchResultCard에서 받아온 정보:");
    console.log(state);
*/ 
const EditPage = () => {
    const classes = useStyles();
    const { state } = useLocation();
    
    return(
        <Wrapper>
            <h3> 📕책정보📕</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="filled-read-only-input"
                        style ={{width: '98%'}} 
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
                </div>
                <h3> 📖독후감 정보📖</h3>
                <div>
                <TextField id="outlined-search" label="독후감 제목" type="search" variant="outlined" />
                <TextField
                    id="datetime-local"
                    label="작성 날짜"
                    type="datetime-local"
                    defaultValue="2022-05-13T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="별점(1~10)"
                    type="number"
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
                    multiline
                    placeholder="자유롭게 작성해 주세요" 
                    variant="outlined" 
                    />
                </div>
            </form>
            <Spacing/>
            <Button variant="contained" color="default" type="submit">작성완료</Button>
        </Wrapper>
    );
}

export default EditPage;