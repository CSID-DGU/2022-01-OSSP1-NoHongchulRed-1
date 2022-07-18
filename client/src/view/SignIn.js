import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import axios from 'axios';
import './SignIn.css'

const SignIn = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    
    const onChangeId = (e) => {setId(e.target.value)}
    const onChangePw = (e) => {setPw(e.target.value)}

    const onClickButton = () => {
        if (id === "") { alert("아이디를 입력해주세요.") }
        else if (pw === "") { alert("비밀번호를 입력해주세요") }
        else {
            axios.post('/api/db/users/login', {
                userid: id,
                password: pw 
            }).then((res) => {
                if(res.data.issuccess){
                    setCookie(
                        'user', 
                        { userId: res.data.userId, nickName: res.data.nickname},
                        { path:'/', expires: new Date(res.data.cookie.expires) }
                        // Dev: 추가 구현, 9번 항목 쿠키 유효 시간
                        // { path:'/', expires: after1 }
                    );

                    setTimeout(function() {
                        navigate("/Main");
                    }, 0)
                    alert(res.data.nickname + "님 환영합니다!")
                    
                }
                else{ alert("아이디, 비밀번호가 틀렸습니다.") }
            }).catch((err) => {
                console.log(err)
                alert("로그인 시도 중 장애가 발생했습니다.")
            })
        }
    }

    const onClickSignUp = () => {
        navigate('/SignUp');
    }

    const onKeyDownInput = (e) => {
        if(e.keyCode === 13){
            onClickButton();
         }
    }

    return (
        <div className="login-area">
            <div className="title-box">
                <img src={process.env.PUBLIC_URL + "/dongguk_logo.jpg"} alt="logo" />
                <div>
                    <h1>Read Lead</h1>
                    <h4>공개 SW 프로젝트 독후감 웹</h4>
                </div>
            </div>
            <div className="login-box">
                <div className="flex-vertical">
                    <div className="flex-horizontal text-fild">
                        <div className="login-text flex-vertical">
                            <TextField label="ID" onChange={onChangeId} onKeyDown={onKeyDownInput} />
                            <TextField type="password" label="PW" onChange={onChangePw} onKeyDown={onKeyDownInput} />
                        </div>
                        <Button variant="contained" color="primary" onClick={onClickButton}>Login</Button>
                    </div>
                    
                    <div className="flex-horizontal signup-fild">
                        <GroupAddIcon />
                        <label onClick={onClickSignUp}>회원가입</label>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;