// server/routes/debug.api.js
const express = require('express');
const router = express.Router();
const { redisClient } = require('../config/redis');

router.get('/debug/rt/:uid', async (req, res) => {
  const { uid } = req.params;
  const pattern = `refreshToken:${uid}:*`;

  const keys = [];
  for await (const chunk of redisClient.scanIterator({
    MATCH: pattern,
    COUNT: 200,
  })) {
    if (Array.isArray(chunk)) keys.push(...chunk); // ★ 배열이면 평탄화
    else keys.push(chunk); // ★ 문자열이면 그대로
  }

  res.json({
    uid,
    pattern,
    count: keys.length, // 이제 ‘진짜 개수’
    keys: keys.slice(0, 50), // 샘플
  });
});

module.exports = router;
