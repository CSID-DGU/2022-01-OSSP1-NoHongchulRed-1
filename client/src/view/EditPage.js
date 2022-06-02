/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation} from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


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

const START_STAR = 0;
const END_STAR = 10;

const MenuProps = {
    PaperProps: {
      style: {
        // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 150,
        maxHeight: 150,
      },
    },
  };

const EditPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // const date = new Date();
    // const year = date.getFullYear();
    // const month = ("00" + (date.getMonth() + 1).toString()).slice(-2);
    // const day = ("00" + date.getDate().toString()).slice(-2);
    // const hour = ("00" + date.getHours().toString()).slice(-2);
    // const minutes = ("00" + date.getMinutes().toString()).slice(-2);
    // const today = year + "-" + month + "-" + day + "T" + hour + ":" + minutes

    const [isbn, setIsbn] = useState(location?.state?.isbn)
    const [bookInfo, setBookInfo] = useState({
        title: location?.state?.title,
        author: location?.state?.authors[0],
        publisher: location?.state?.publisher,
        thumbnail: location?.state?.thumbnail
    });
    const [bookReportTitle, setBookReportTitle] = useState('');
    const [bookReportContent, setBookReportContent] = useState('');
    const [star, setStar] = useState('0');

    const handleStarChange = (e) => {setStar(e.target.value)};
    const starRender = () => {
        const renderResult = [];
        for (let i = START_STAR; i <= END_STAR; i++) {
            renderResult.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return renderResult;
    }


    const onClickRegBookReport = () => {

        if(bookReportTitle === ""){
            alert("독후감 제목을 입력해주세요")
        }
        else if(bookReportContent === ""){
            alert("독후감 내용을 입력주세요")
        }
        else if(parseInt(star) === 0){
            alert("별점을 선택해주세요")
        }
        else{
            axios.post('/db/books', {
                isbn: isbn,
                // isbn: isbn,
                title: bookInfo.title,
                authors: bookInfo.author,
                publisher: bookInfo.publisher,
                thumbnail: bookInfo.thumbnail
            }).then((res) => {
                // console.log(res.data)
                if(res.data.issuccess){
                    console.log("책이 등록되었습니다.")
                }
                else{
                    console.log("이미 등록된 책입니다.")
                }
            }).catch((e) => {
                console.log(e)
                alert('책 등록 중 오류가 발생했습니다.')
            }).finally((e) => {
                axios.post('/db/bookreports', {
                    title: bookReportTitle,
                    contents: bookReportContent,
                    rating: String(star),
                    userid: cookies?.user?.userId,
                    isbn: String(isbn),
                    // isbn: isbn.split(' ')[0],
                }).then((res) => {
                    console.log(res)
                    if(res.data.issuccess){
                        alert('독후감이 등록되었습니다.')
                    }else{
                        alert("이미 등록된 독후감이 있습니다.")
                    }
                    // console.log(parseIsbn)
                    navigate(-1)
                }).catch((e) => {
                    console.log(e)
                    alert('독후감 등록 중 오류가 발생했습니다.')
                })
            })



            // axios.post('/db/bookreports', {
            //     title: String(bookReportTitle),
            //     contents: String(bookReportContent),
            //     rating: String(star),
            //     userId: String(cookies?.user?.userId),
            //     isbn: String(isbn.split(' ')[0]),
            //     // isbn: isbn.split(' ')[0],
            // }).then((res) => {
            //     console.log(res)
            //     alert('독후감이 등록되었습니다.')
            //     navigate(-1)
            // }).catch((e) => {
            //     console.log(e)
            //     alert('독후감 등록 중 오류가 발생했습니다.')
            // })
        }

    }


    const onChangeTitle = (e) => {setBookReportTitle(e.target.value)};
    const onChangeContent = (e) => {setBookReportContent(e.target.value)};

    return(
        <Wrapper>
            <h3> 📕 책정보 📕</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="filled-read-only-input"
                        label="책 제목"
                        style ={{width: '57%'}} 
                        defaultValue={bookInfo.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="저자"
                        defaultValue={bookInfo.author}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="출판사"
                        defaultValue={bookInfo.publisher}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </div>
                <h3> 📖 독후감 정보 📖 </h3>
                <div>
                <TextField 
                    id="outlined-search" 
                    label="독후감 제목" 
                    style ={{width: '98%'}} 
                    type="search" 
                    variant="outlined" 
                    onChange={onChangeTitle}
                    value={bookReportTitle}
                    />
                {/* <TextField
                    id="datetime-local"
                    label="작성 날짜"
                    type="datetime-local"
                    // defaultValue="2022-05-13T10:30"
                    defaultValue={bookReportInfo.date}
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}/> */}
                </div>
                <h3>📌 내용 📌</h3>
                <div>
                    <TextField 
                        multiline
                        id="outlined-basic" 
                        style ={{width: '98%'}} 
                        placeholder="자유롭게 작성해 주세요" 
                        variant="outlined"
                        onChange={onChangeContent}
                        value={bookReportContent}
                         />
                </div>
                <h3>⭐ 별점 ⭐</h3>
                <Select
                   // style="width:100px; height:50px;"
                   style ={{width: '100px'}} 
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    MenuProps={MenuProps}
                    value={star}
                    onChange={handleStarChange}
                >
                    <MenuItem value="" disabled>선택하세요</MenuItem>
                    {starRender()}
                </Select>
            </form>
            <Spacing/><Spacing/>
            <Button variant="contained" color="default" type="submit" onClick={onClickRegBookReport}>작성완료</Button>
        </Wrapper>
    );
}

export default EditPage;