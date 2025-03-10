# **Momentum Fullstack v2.0.0 🗓️**

<div align="center"><img src="https://github.com/user-attachments/assets/dabc9eec-22c3-4e25-960f-d5254860e7fd" alt="Momentum 이미지" width="300"/></div>

<p align="center">
<a href="https://web-react-momentum2-front-m6m4lqe82f54a44f.sel4.cloudtype.app" target="_blank"><b>🚀 배포 사이트 가기</b></a>
</p>

---

## 📌목차  
1. [소개](#소개)  
2. [기술 스택](#기술-스택)
3. [주요 기능](#주요-기능)  
4. [설치 및 실행](#설치-및-실행)  
5. [API 문서](#API-문서)  
6. [버전 정보](#버전-정보)  
7. [프로젝트 회고록 및 진행 기록](#프로젝트-회고록-및-진행-기록)  

---

## **📖소개**
<div align="center">
    <img src="https://github.com/user-attachments/assets/d9cfa7f6-e22b-4aa7-beea-3082dfccf1d2" alt="main 페이지" width="91%">
</div>
<div align="center">
    <img src="https://github.com/user-attachments/assets/480ff48f-e5f6-4023-902f-7bdf98504f24" alt="pomodoro 페이지" width="45%">
    <img src="https://github.com/user-attachments/assets/8d23564e-9189-4a5d-a1cb-0fcd8506413a" alt="gpt 페이지" width="45%">
</div>
<br>
**Momentum Fullstack**은 기존 Momentum 프로젝트를 확장하여 **백엔드를 추가한 풀스택 애플리케이션**입니다.  
사용자의 생산성을 높이기 위한 다양한 기능을 제공하며, Express 기반의 RESTful API 및 MongoDB를 활용하여 데이터를 영속적으로 관리할 수 있도록 개선되었습니다.  

---
## **🌿기술 스택**
### **Frontend**
- **React, Redux Toolkit** - 상태 관리 최적화
- **React Query** - API 요청 캐싱 및 성능 최적화
- **Styled-Components, SCSS** - 반응형 UI 디자인

### **Backend**
- **Node.js, Express** - RESTful API 설계 및 서버 구축
- **MongoDB, Mongoose** - 데이터 영속성 확보
- **JWT, Bcrypt** - 사용자 인증 및 보안 강화
- **Express-rate-limit** - API 요청 제한을 통한 보안 강화

### **CI/CD & 배포**
- **GitHub Actions** - 자동 테스트 및 빌드
- **Vercel** - 프론트엔드 배포
- **Render** - 백엔드 배포

---

## **🔥주요 기능**
### **✅ 프론트엔드**
- **투두 리스트(Today/Schedule) 관리**  
  - Redux Toolkit을 활용한 상태 관리 최적화  
  - 서버와의 동기화로 다중 기기에서도 데이터 유지  
- **GPT 기반 일정 분석 & 피드백**  
  - OpenAI API를 활용하여 사용자의 할 일 목록 분석 및 조언 제공  
- **날씨, 시간, 인용문, 뽀모도로 타이머**  
  - OpenWeather API 연동하여 실시간 날씨 정보 제공  
  - 사용자의 집중력 강화를 위한 뽀모도로 타이머 기능  

### **✅ 백엔드**
- **Node.js & Express 기반 RESTful API 구축**  
  - CRUD 기능을 포함한 서버 API 설계 및 데이터 관리  
- **MongoDB 데이터 영속성 확보**  
  - 기존 로컬 스토리지 기반 저장 방식에서 데이터베이스 기반 저장으로 개선  
- **JWT 인증 및 보안 강화**  
  - JWT를 활용한 로그인 시스템 구축  
  - Bcrypt를 이용한 비밀번호 암호화  
- **API 요청 최적화 및 보안 적용**  
  - Express-rate-limit을 활용하여 API 요청 제한  
  - 불필요한 데이터 응답 최소화 및 필터링 적용  

---

## **🚀설치 및 실행**
### **1️⃣ 프로젝트 클론**
```bash
git clone https://github.com/Parkseolmin/React_Fullstack_Momentum.git
cd React_Fullstack_Momentum
```
### **2️⃣ 프로젝트 클론**
```bash
cd client
npm install
npm start
```
### **3️⃣ 백엔드 실행**
```bash
cd server
npm install
npm start
```
### **4️⃣ 환경 변수 설정**
프로젝트 루트 디렉토리에 .env 파일을 생성하고, API 키 및 설정을 추가합니다.
```bash
# 프론트엔드 환경 변수 (client/.env)
REACT_APP_UNSPLASH_API=your_unsplash_api_key
REACT_APP_WEATHER_API=your_openweathermap_api_key
REACT_APP_GPT_KEY=your_gpt_api_key
REACT_APP_BACKEND_URL=http://localhost:5000

# 백엔드 환경 변수 (server/.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

## **📜API 문서**
백엔드 API에 대한 문서는 Postman API Docs에서 확인할 수 있습니다.
```bash
GET    /api/todos         # 모든 투두 가져오기
POST   /api/todos         # 새 투두 생성
PUT    /api/todos/:id     # 특정 투두 업데이트
DELETE /api/todos/:id     # 특정 투두 삭제

POST   /api/user          # 회원가입
POST   /api/user/login    # 로그인
GET    /api/user/me       # 현재 로그인된 사용자 정보 가져오기
```

## **📌버전 정보**
현재 버전: v2.0.0<br>
🔹 v2.0.0: 백엔드 추가 & 풀스택 확장
- MongoDB & Express 백엔드 구축 → API 기반 데이터 관리
- JWT 인증 시스템 추가 → 사용자 로그인/회원가입 기능 구현
- 프론트엔드-백엔드 데이터 동기화 최적화 → Redux Thunk 활용
- Express-rate-limit 적용 → API 요청 보안 강화
<br>
🔹 향후 업데이트 예정

- v2.1.0: RTK Query 도입

  - 기존 Redux Thunk 방식에서 RTK Query 로 API 상태 관리 최적화
  - 불필요한 API 요청 최소화 및 자동 캐싱 적용

- v2.2.0: TypeScript 적용

  - 정적 타입 검사를 통한 코드 안정성 향상
  - 개발자 경험 개선 및 유지보수 용이성 증가

<br>

## **📝프로젝트 회고록 및 진행 기록**

- [ver1.0.0 Blog 글 보러가기](https://snowman-seolmini.tistory.com/70)
- [ver1.0.1 Blog 글 보러가기](https://snowman-seolmini.tistory.com/101)
