const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS 설정 (라우터 등록 전에 적용)
const allowedOrigins = [
  'http://localhost:3000',
  'https://web-react-momentum2-front-m6m4lqe82f54a44f.sel4.cloudtype.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('❌ CORS 오류: 허용되지 않은 출처입니다.'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ OPTIONS 추가
    allowedHeaders: ['Content-Type', 'Authorization'], // ✅ Authorization 허용
    credentials: true, // ✅ 인증 정보 포함 허용
  }),
);

// ✅ 프리플라이트 요청(OPTIONS) 허용
app.options('*', cors());

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
