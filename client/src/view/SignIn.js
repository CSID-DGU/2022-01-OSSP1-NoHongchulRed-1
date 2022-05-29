import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Logo from '../image/logo.png'
import './SignIn.css'

const SignIn = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        userid: '',
        password: ''
    });

    const onChangeLoginData = (e) => {
        const { value, name } = e.target;
        
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const onClickButton = () => {
        if (loginData.userid === "") {
            alert("아이디를 입력해주세요.");
        }
        else if (loginData.password === "") {
            alert("비밀번호를 입력해주세요");
        }
        else {
            try {
                // axios로 post
                // userid와 password를 body에 넣어 전달
                axios.post('/db/users/login', {
                    userid: loginData.userid,
                    password: loginData.password 
                }).then((res) => {
                    return res.data;
                })
                .then((data) => {
                    // 세션을 data로 넘겨줌
                    if (data.issuccess) {
                        navigate('/Main');
                    } else {
                        alert("로그인 실패");
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    const onClickSignUp = () => {
        navigate('/SignUp');
    }

    return (
        <div className="login-area">
            <div className="title-box">
                <img src={Logo} alt="logo" />
                <div>
                    <h2>공개 SW 프로젝트</h2>
                    <h2>독후감 웹</h2>
                </div>
            </div>
            <div className="login-box">
                <div className="flex-vertical">
                    <div className="flex-horizontal text-fild">
                        <div className="login-text flex-vertical">
                            <TextField className="standard-basic" label="ID" name="userid" value={loginData.userid} onChange={onChangeLoginData} />
                            <TextField className="standard-basic" type="password" label="PW" name="password" value={loginData.password} onChange={onChangeLoginData} />
                        </div>
                        <Button variant="contained" color="primary" onClick={onClickButton}>Login</Button>
                    </div>
                    
                    <div className="flex-horizontal signup-fild">
                    {/* <div> */}
                        <GroupAddIcon />
                        <label onClick={onClickSignUp}>회원가입</label>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;