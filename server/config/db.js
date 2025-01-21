const mongoose = require('mongoose');
require('dotenv').config(); // 환경 변수 로드

const MONGO_URI = process.env.MONGO_DEPLOYMENT_URI;
console.log('MONGO_URI:::', MONGO_URI);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`DB Connection Error: ${err.message}`);
    process.exit(1); // 연결 실패 시 서버 종료
  }
};

module.exports = connectDB;
