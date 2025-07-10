const { createClient } = require('redis');
require('dotenv').config();

const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
    process.exit(1);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};
