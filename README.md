# 2022-01-OSSP1-NoHongchulRed-1
> 2022-01 공개SW프로젝트 1팀 홍철없는 홍팀
> 
> 독후감 공유 및 도서 추천 플랫폼

## Team Member

|학번|이름|역할|
|------|---|---|
|2018113288|동원진|프론트엔드|
|2020111985|이채린|프론트엔드|
|2020112031|전민정|백엔드|
|2020111994|홍성빈|백엔드|

## About Project
READ LEAD - 책을 읽고 독후감을 작성할 수 있는 사이트, 책 추천까지 해줌으로써 나에게 맞는 책을 찾는 것을 도와준다.

## Tech Stack
<div align=center>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <br>
  
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/MUI-2196F3?style=for-the-badge&logo=MUI&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/scikitlearn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/KakaoAPI-FFCD00?style=for-the-badge&logo=Kakao&logoColor=black">
  <br>
  
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

## Environment
### Server
- Node.js 16.14.2
- Express 4.18.1
### Client
- React 17.0.2

## Main Feature
1. Login page  
<img src="image/Loginpage.png" width="75%" height="75%">

2. Sign up page  
<img src="image/Signuppage.png" width="75%" height="75%">

3. Main page  
<img src="image/Mainpage.png" width="75%" height="75%">

4. Book search page  
<img src="image/Booksearchpage.png" width="75%" height="75%">

5. Edit page  
<img src="image/Editpage.png" width="75%" height="75%">

6. Gather report page   
<img src="image/Gatherreportpage.png" width="75%" height="75%">

7. All report page   
<img src="image/Allreportpage.png" width="75%" height="75%">

8. My book page  
<img src="image/Mybookpage.png" width="75%" height="75%">

9. Recommend page   
<img src="image/Recommendpage.png" width="75%" height="75%">

Introduction to the SVD algorithm
- 어떠한 행렬을 SVD 분해하여 특이값을 얻어내고, 이를 바탕으로 예측 평점 계산
- 계산한 예측 평점이 높은 순으로 추천 도서 제공  
<img src="image/svd.png" width="45%" height="45%">


Introduction to the Cosine Similarity algorithm
- 초기 평점 데이터 부족한 svd 추천을 보완하기 위해 도입
- 회원가입 시 유저에게 도서 분류별 관심도 정보 받아 계산
- 방향적인 유사도 정보를 위해 코사인 유사도 활용
- 나와 유사한 집합에서 평점 평균이 높은 순으로 추천 도서 제공


## Issue Name Rules
- Dev: 개발 관련 이슈
- Bug: 버그 관련 이슈
- Etc: 기타 이슈
