const rateLimit = require('express-rate-limit');

// 기본 요청 제한 설정
const defaultRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10, //
  message: {
    error: 'Too many requests. Please try again later.',
  },
});

// 특정 사용자 요청 제한 설정 (게스트 계정용)
const guestRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10, //
  message: {
    error: '게스트 계정은 1분동안 제한된 요청이 설정됩니다.',
  },
});

module.exports = { defaultRateLimit, guestRateLimiter };
