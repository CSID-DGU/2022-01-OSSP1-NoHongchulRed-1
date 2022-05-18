import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const navigate = useNavigate();

    const path = window.location.pathname;

    return (
        <div className="nav-area">
            <div style={{fontWeight: path === '/main' && 'bold' }} onClick={() => navigate('/main')}>메인</div>
            <div style={{fontWeight: path === '/longReport' && 'bold' }} onClick={() => navigate('/longReport')}>장문 독후감</div>
            <div style={{fontWeight: path === '/shortReport' && 'bold' }} onClick={() => navigate('/shortReport')}>단문 독후감</div>
        </div>
    )
};

export default Nav;