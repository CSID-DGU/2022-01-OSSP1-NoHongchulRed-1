import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { GroupAdd } from '@material-ui/icons';
import Logo from '../../assets/images/logo.png'
import './SignIn.css'

const SignIn = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    
    const onChangeId = (e) => {setId(e.target.value)}
    const onChangePw = (e) => {setPw(e.target.value)}

    const onClickButton = () => {
        if(id === ""){
            alert("아이디를 입력해주세요.")
        }
        else if(pw === ""){
            alert("비밀번호를 입력해주세요")
        }
        else{
            // 이쪽에 Axios 하시면됩니다.
            // Axios.get('/api', {
            //     params: {
            //         id: id,
            //         pw: pw
            //     }
            // }).then(function (response) {
            //     console.log(response);
            //     navigate('/main');
            // }).catch((err) => { console.log(err) });
        }
    }

    const onClickSignUp = () => {
        navigate('/signup');
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
                            <TextField id="standard-basic" label="ID" onChange={onChangeId} />
                            <TextField id="standard-basic" type="password" label="PW" onChange={onChangePw} />
                        </div>
                        <Button variant="contained" color="primary" onClick={onClickButton}>Login</Button>
                    </div>
                    
                    <div className="flex-horizontal signup-fild">
                    {/* <div> */}
                        <GroupAdd />
                        <label onClick={onClickSignUp}>회원가입</label>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;