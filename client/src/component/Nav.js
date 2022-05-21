import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const navigate = useNavigate();

    const path = window.location.pathname;

    return (
        <div className="nav-area">
            <div style={{fontWeight: path === '/ShortReport' && 'bold' }} onClick={() => navigate('/ShortReport')}>모든 독후감</div>
            <div style={{fontWeight: path === '/RecommendPage' && 'bold' }} onClick={() => navigate('/RecommendPage')}>추천 도서</div>
            <div style={{fontWeight: path === '/MyBookPage' && 'bold' }} onClick={() => navigate('/MyBookPage')}>나의 독후감</div>
        </div>
    )
};

export default Nav; 