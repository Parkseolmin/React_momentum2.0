const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/health', (req, res) => {
  const mongo = mongoose.connection.readyState; // 1이면 연결 OK
  const redisOpen = global.redisClient?.isOpen ?? false; // 네가 전역에 저장했다면
  res.json({
    ok: true,
    mongo,
    redis: redisOpen,
    env: {
      MONGODB_URI: !!process.env.MONGODB_URI,
      JWT_SECRET: !!process.env.JWT_SECRET,
    },
    t: Date.now(),
  });
});

router.get('/ping', (req, res) => res.json({ ok: true, t: Date.now() }));

module.exports = router;
