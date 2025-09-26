// server/health.js
const express = require('express');
const mongoose = require('mongoose');
const { redisClient } = require('./config/redis'); // 모듈에서 직접 import
const { getMongoUri } = require('./config/db');

const router = express.Router();

router.get('/health', async (req, res) => {
  // --- Mongo 상태 ---
  const mongoState = mongoose.connection.readyState; // 1이면 connected
  let mongoPing = null,
    mongoErr = null;
  try {
    if (mongoState === 1 && mongoose.connection.db) {
      // admin ping (선택)
      mongoPing = await mongoose.connection.db.admin().ping();
    }
  } catch (e) {
    mongoErr = e?.message || String(e);
  }

  // --- Redis 상태 ---
  let redis = {
    hasClient: !!redisClient,
    connected: false,
    ping: null,
    err: null,
  };
  if (redisClient) {
    try {
      redis.connected = !!redisClient.isOpen;
      if (redis.connected) {
        redis.ping = await redisClient.ping(); // "PONG"
      }
    } catch (e) {
      redis.err = e?.message || String(e);
    }
  }

  // --- ENV 존재 여부 ---
  res.json({
    ok: true,
    mongo: { state: mongoState, ping: mongoPing, err: mongoErr },
    redis,
    env: {
      // 존재 여부만 true/false로 보여줌
      MONGODB_URI: !!process.env.MONGODB_URI || !!process.env.MONGO_URI,
      REDIS_HOST: !!process.env.REDIS_HOST,
      REDIS_PORT: !!process.env.REDIS_PORT,
      REDIS_PASSWORD: !!process.env.REDIS_PASSWORD,
    },
    t: Date.now(),
  });
});

router.get('/ping', (req, res) => res.json({ ok: true, t: Date.now() }));

module.exports = router;
