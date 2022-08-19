# 2022-01-OSSP1-NoHongchulRed-1
> 2022-01 공개SW프로젝트 1팀 홍철없는 홍팀
> 
> READ LEAD
> 
> 독후감/서평 공유 및 도서 추천 플랫폼 


## Demo Website
> http://146.56.172.91
> 
> ※ 원활한 사이트 관리를 위해 사용자 정보는 주기적으로 삭제될 수 있습니다.


## Team Member

|학번|이름|역할|
|------|---|---|
|2018113288|동원진|프론트엔드|
|2020111985|이채린|프론트엔드|
|2020112031|전민정|백엔드|
|2020111994|홍성빈|백엔드|


## Tech Stack
<div align=center>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/MUI-2196F3?style=for-the-badge&logo=MUI&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/scikitlearn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/KakaoAPI-FFCD00?style=for-the-badge&logo=Kakao&logoColor=black">
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/oracle cloud-F80000?style=for-the-badge&logo=oracle&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>


## Environment

### Server
- Node.js 16.14.2
- Express 4.18.1
- MySQL 8.0.29-0ubuntu0.20.04.3
- Nginx 1.23.1

### Client
- React 17.0.2


## Main Feature

### Recommend System

**1. SVD recommend system**
- 유저-평점 행렬을 SVD 분해하여 특이값을 얻어내고, 이를 바탕으로 예측 평점 계산
- 계산한 예측 평점이 높은 순으로 추천 도서 제공
<img src="https://user-images.githubusercontent.com/83688807/173960562-afb2069b-cc08-458e-85cc-069bad0d8a8a.png"  width="30%" height="30%"/>
<br>

**2. Cosine Similarity recommend system**
- 회원가입 시 유저에게 도서 분류별 관심도 정보 받아 계산
- 방향적인 유사도 정보를 위해 코사인 유사도 활용
- 나와 유사한 집합에서 평점 평균이 높은 순으로 추천 도서 제공
<img src="https://user-images.githubusercontent.com/83688807/173960573-b8d0cefb-c71b-4b0f-817f-8a7f17a1131b.png"  width="30%" height="30%"/>


### Page
**1. Login page**

![Loginpage](https://user-images.githubusercontent.com/83688807/173960048-0095d697-658e-4765-8e64-bbf409d9fe81.PNG)
- 아이디와 비밀번호를 사용하여 로그인
<br>

**2. Sign up page**

![Signuppage](https://user-images.githubusercontent.com/83688807/173960058-e322d147-6ecc-48ee-87c3-3e47e03557ad.PNG)
- 회원 정보 입력하여 회원가입
<br>

**3. Main page**

![Mainpage](https://user-images.githubusercontent.com/83688807/173960125-a72ddfd8-523a-4910-8107-9cf6dce90057.PNG)
- 인기 독후감 제공(조회수 기준)
- 책 검색 기능
<br>

**4. Book search page**

![Booksearchpage](https://user-images.githubusercontent.com/83688807/173960362-f2199be6-eb64-400c-9c91-c7a2f107f029.PNG)
- 독후감 작성 및 독후감 모아보기 가능
<br>

**5. Edit page**

![Editpage](https://user-images.githubusercontent.com/83688807/173960200-cef5c654-d6b1-499e-8d72-7d4b9b7ab4ec.PNG)
- 독후감 작성 기능
<br>

**6. Gather report page**

![Gatherreportpage](https://user-images.githubusercontent.com/83688807/173960287-25b850d3-383e-4c71-9c4e-f71b6f997508.PNG)
- 독후감 정보 확인 기능
<br>

**7. All report page**

![Allreportpage](https://user-images.githubusercontent.com/83688807/173960296-7e9c5b2d-098e-41e0-b1e8-38c5cc24abd9.PNG)
- 전체 유저의 독후감 조회 기능
<br>

**8. My book page**

![Mybookpage](https://user-images.githubusercontent.com/83688807/173960308-6e80adff-aa17-452b-86ed-e778e2486e62.PNG)
- 나의 독후감 조회 기능
<br>

**9. Recommend page**

![Recommendpage](https://user-images.githubusercontent.com/83688807/173960324-605b01fe-1d10-4372-9a43-c80012327257.PNG)
- 추천 시스템 기능(svd/cos)


## Requirements
- 주어진 API에 맞는 DB 서버(server/Router 참고)
- 카카오 API 키, DB 설정값, 세션 secret 정보 관련 환경변수 파일(.env)

(해당 사항은 본 리포지토리에서 제공되지 않으며 개별적으로 준비해야 함)


## Issue Name Rules
- Dev: 개발 관련 이슈
- Bug: 버그 관련 이슈
- Etc: 기타 이슈
