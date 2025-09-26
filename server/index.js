const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const { connectRedis } = require('./config/redis');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://web-react-momentum2-0-client-m6m4lqe82f54a44f.sel4.cloudtype.app',
    ],
    credentials: true,
  }),
);

app.use(express.json());

// MongoDB 연결
connectDB();
connectRedis();

// 라우트 설정
app.use('/api', routes); // 모든 라우트를 /api에 연결
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully!');
});

// 에러 핸들링
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
