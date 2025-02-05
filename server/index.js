const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 허용할 도메인 목록 설정
const allowedOrigins = [
  'http://localhost:3000', // 로컬 개발 환경 허용
  'https://web-react-momentum2-front-m6m4lqe82f54a44f.sel4.cloudtype.app', // 배포된 프론트엔드 허용
];

// ✅ CORS 설정
app.use(
  cors({
    origin: (origin, callback) => {
      // 요청이 없거나 허용된 도메인인 경우 요청 허용
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('❌ CORS 오류: 허용되지 않은 출처입니다.'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    credentials: true, // 쿠키 인증 요청 허용 (필요 시)
  }),
);

// JSON 요청 처리 미들웨어
app.use(express.json());

// MongoDB 연결
connectDB();

// 라우트 설정
app.use('/api', routes); // 모든 라우트를 /api에 연결
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully!');
});

// 에러 핸들링
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
