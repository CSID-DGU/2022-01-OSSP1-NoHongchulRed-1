import React from 'react';
import { useNavigate } from 'react-router-dom'

import Logo from '../../assets/images/logo.png'
import './title.css'

const Title = () => {
    const navigate = useNavigate();

    return (
        <div className="title-area" onClick={() => navigate('/main')}>
            <img src={Logo} alt="logo" />
            <div>
                <h2>공개 SW 프로젝트</h2>
                <h2>독후감 웹</h2>
            </div>
        </div>
    )
};

export default Title;