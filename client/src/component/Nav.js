import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const navigate = useNavigate();

    const path = window.location.pathname;
    if (path === '/' || path==='/SignUp') return null; /*로그인, 회원가입 페이지에서 Nav 숨기기 */
    return (
        <div className="nav-area">
            <div style={{fontWeight: path === '/Main' && 'bold' }} onClick={() => navigate('/Main')}>메인페이지</div>
            <div style={{fontWeight: path === '/ShortReport' && 'bold' }} onClick={() => navigate('/ShortReport')}>모든 독후감</div>
            <div style={{fontWeight: path === '/BookSearchPage' && 'bold' }} onClick={() => navigate('/BookSearchPage')}>추천 도서</div>
            <div style={{fontWeight: path === '/MyBookPage' && 'bold' }} onClick={() => navigate('/MyBookPage')}>나의 독후감</div>
            {/* <div style={{fontWeight: path === '/UserEdit' && 'bold' }} onClick={() => navigate('/UserEdit')}>회원정보 수정</div> */}
        </div>
    )
};

export default Nav;