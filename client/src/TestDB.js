import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Test = () => {
    // 세션 정보 받아오는용
    const [userSession, setUserSession] = useState({
        id: '',
        nickname: ''
    });

    // 로그인용
    const [loginInputs, setLoginInputs] = useState({
        id: '',
        password: ''
    });

    const onChangeLogin = (e) => {
        const { value, name } = e.target;
        
        setLoginInputs({
            ...loginInputs,
            [name]: value
        });
    };
    const onResetLogin = () => {
        setLoginInputs({
            id: '',
            password: ''
        });
    };

    const onSubmitLogin = () => {
        try {
            // axios로 post
            // id와 password를 body에 넣어 전달
            axios.post('/db/users/login', {
                id: loginInputs.id,
                password: loginInputs.password 
            }).then((res) => {
                return res.data;
            })
            .then((data) => {
                // 세션을 data로 넘겨주었으므로 해당 내용으로 설정
                console.log(data)
                setUserSession({
                    ...userSession,
                    id: data.userId,
                    nickname: data.nickname
                });
            });
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmitLoout = () => {
        try {
            // axios로 post
            // id와 password를 body에 넣어 전달
            axios.get('/db/users/logout')
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                // 세션을 data로 넘겨주었으므로 해당 내용으로 설정
                console.log(data)
                setUserSession({
                    ...userSession,
                    id: data.userId,
                    nickname: data.nickname
                });
            });
        } catch (err) {
            console.log(err)
        }
    }

    // 회원가입용
    const [registerInputs, setRegisterInputs] = useState({
        id: '',
        password: '',
        nickname: '',
        age: '',
        sexuality: '',
    });

    const onChangeRegister = (e) => {
        const { value, name } = e.target;
        
        setRegisterInputs({
            ...registerInputs,
            [name]: value
        });
    };
    const onResetRegister = () => {
        setLoginInputs({
            id: '',
            password: ''
        });
    };

    const onSubmitRegister = () => {
        try {
            // axios로 post
            // id부터 sexuality까지를 body에 넣어 전달
            axios.post('/db/users', {
                id: registerInputs.id,
                password: registerInputs.password,
                nickname: registerInputs.nickname,
                age: registerInputs.age,
                sexuality: registerInputs.sexuality
            }).then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log(data);
            });
        } catch (err) {
            console.log(err);
        }
    }

    // ~자를 입력하세요 등 텍스트는 임의로 설정한 것
    // 단순한 테스트를 위해 라디오버튼나 체크박스 사용 안함 (실제 개발 시 UI 내용 적용 필요)
    return (
        <div>
            <h1><font size="7">로그인</font></h1>
            <input type="text" name="id" placeholder="아이디" value={loginInputs.id} maxLength="20" onChange={onChangeLogin} />
            <br />
            <input type="password" name="password" placeholder="비밀번호" value={loginInputs.password} maxLength="20" onChange={onChangeLogin} />
            <br />
            <button onClick={onSubmitLogin}>로그인</button>
            <button onClick={onResetLogin}>취소</button>
            <br />
            <p>id: {userSession.id}, nickname: {userSession.nickname}</p>
            <br />
            <button onClick={onSubmitLoout}>로그아웃</button>

            <hr />

            <h1><font size="7">회원가입</font></h1>
            <input type="text" name="id" placeholder="아이디는 4~16자를 입력하세요" value={registerInputs.id} maxLength="16" onChange={onChangeRegister} />
            <br />
            <input type="password" name="password" placeholder="비밀번호는 8~16자를 입력하세요" value={registerInputs.password} maxLength="16" onChange={onChangeRegister} />
            <br />
            <input type="text" name="nickname" placeholder="닉네임은 2~10자를 입력하세요" value={registerInputs.nickname} maxLength="10" onChange={onChangeRegister} />
            <br />
            <input type="text" name="age" placeholder="10대-0, 20대-1, 30대-2, 40대-3, 50대-4, 60대 이상-5" value={registerInputs.age} maxLength="10" onChange={onChangeRegister} />
            <br />
            <input type="text" name="sexuality" placeholder="M/F" value={registerInputs.sexuality} maxLength="10" onChange={onChangeRegister} />
            <br />
            <button onClick={onSubmitRegister}>회원가입</button>
            <button onClick={onResetRegister}>취소</button>
        </div>
    );
};

export default Test;