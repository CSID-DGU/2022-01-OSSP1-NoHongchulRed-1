import React from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components'; //CSS-IN_JS
import SvdRecommend from '../component/SvdRecommend';
import CosineRecommend from '../component/CosineRecommend';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 70rem;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 2rem 0.5rem 2rem;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

/*
const BookWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
*/

const BookList = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
`;
   
const RecommendPage = () => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    return(
        <Wrapper>
            <BookList>
                <h2>⭐ {cookies?.user?.nickName} 님의 평점 정보를 기반으로 한 추천 도서입니다. ⭐</h2>
                <Spacing />
                <SvdRecommend></SvdRecommend>
                <Spacing />
                <h2>⭐ {cookies?.user?.nickName} 님의 성향 정보를 기반으로 한 추천 도서입니다. ⭐</h2>
                <Spacing />
                <CosineRecommend></CosineRecommend>
            </BookList>
            <Spacing />
            <h4>※ 서버 성능 문제로 추천 정보 확인에 약간의 딜레이(약 5초 가량)가 있을 수 있습니다.</h4>
        </Wrapper>
    );
}

export default RecommendPage;