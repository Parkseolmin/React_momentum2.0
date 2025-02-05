const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 허용할 도메인 목록
const allowedOrigins = [
  'http://localhost:3000',
  'https://web-react-momentum2-front-m6m4lqe82f54a44f.sel4.cloudtype.app',
];

// ✅ CORS 설정 (라우터보다 위에 위치)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('❌ CORS 오류: 허용되지 않은 출처입니다.'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// ✅ 프리플라이트 요청에 대한 수동 응답 처리
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    allowedOrigins.includes(req.headers.origin) ? req.headers.origin : '*',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // ✅ OPTIONS 요청에 대한 빠른 응답
  }

  next();
});

app.use(express.json());
connectDB();
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
