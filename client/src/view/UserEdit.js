import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//import Title from '../common/Title'
import './UserEdit.css'

const START_AGE = 10;
const END_AGE = 100;

const MenuProps = {
    PaperProps: {
      style: {
        // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 60,
        maxHeight: 240,
      },
    },
  };

const UserEdit = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');

    useEffect(() => {
        // 이쪽에 Axios 하시면됩니다.
        // Axios.get('/api', {
        //     params: {
        //         id: id
        //     }
        // }).then(function (response) {
        //     console.log(response);
        //     setId(response.data.id)
        //     setNickName(response.data.id)
        //     setPw(response.data.id)
        //     setPwConfirm(response.data.id)
        //     setAge(response.data.id)
        //     setGender(response.data.id)
        // }).catch((err) => { console.log(err) });
    }, [])

    const onChangeId = (e) => {setId(e.target.value)}
    const onChangeNickName = (e) => {setNickName(e.target.value)}
    const onChangePw = (e) => {setPw(e.target.value)}
    const onChangePwConfirm = (e) => {setPwConfirm(e.target.value)}
    const handleAgeChange = (e) => {setAge(e.target.value)};
    const handleGenderChange = (e) => {setGender(e.target.value)};

    const ageRender = () => {
        const renderResult = [];
        for (let i = START_AGE; i < END_AGE; i++) {
            renderResult.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return renderResult;
    }

    const onClickEdit = () => {
        if(id === ""){
            alert("아이디를 입력해주세요.")
        }
        else if(nickName === ""){
            alert("닉네임을 입력해주세요.")
        }
        else if(pw === ""){
            alert("비밀번호를 입력해주세요.")
        }
        else if(pwConfirm === ""){
            alert("비밀번호를 확인을 입력해주세요.")
        }
        else if(pw !== pwConfirm){
            alert("비밀번호를 확인해주세요.")
        }
        else if(!age){
            alert("나이를 선택해주세요.")
        }
        else{
            // 이쪽에 Axios 하시면됩니다.
            // Axios.get('/api', {
            //     params: {
            //         id: id,
            //         pw: pw,
            //         nickName: nickName,
            //         age: age,
            //         gender: gender
            //     }
            // }).then(function (response) {
            //     console.log(response);
            //     alert("수정 되었습니다.");
            //     navigate('/main');
            // }).catch((err) => { console.log(err) });
        }
    }

    return (
        <>
            <div className="userEdit-area">
                <div className="flex-vertical left_box">
                    <h3>필수정보</h3>
                    <TextField label="아이디" onChange={onChangeId} />
                    <TextField label="닉네임" onChange={onChangeNickName} />
                    <TextField type="password" label="패스워드" onChange={onChangePw} />
                    <TextField 

                    error={pwConfirm !== "" ? pw === pwConfirm ? false : true : false}
                    helperText = {pwConfirm !== "" ? pw === pwConfirm ? '' : '패스워드를 확인해주세요' : ''}
                    
                    type="password" label="패스워드 확인" onChange={onChangePwConfirm} />
                </div>

                <div className="flex-vertical right_box">
                    <h3>추가정보</h3>

                    <h4>나이</h4>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        MenuProps={MenuProps}
                        value={age}
                        onChange={handleAgeChange}
                    >
                        <MenuItem value="" disabled>선택하세요</MenuItem>
                        {ageRender()}
                    </Select>

                    <h4>성별</h4>
                    <RadioGroup className="gender-box" aria-label="gender" name="gender1" value={gender} onChange={handleGenderChange}>
                        <FormControlLabel value="male" control={<Radio />} labelPlacement="start" label="남자" />
                        <FormControlLabel value="female" control={<Radio />} labelPlacement="start" label="여자" />
                    </RadioGroup>

                    <Button variant="contained" color="primary" onClick={onClickEdit}>수정</Button>
                </div>

            </div>
        </>
    )
};

export default UserEdit;