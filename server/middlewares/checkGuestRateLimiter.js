const {
  guestRateLimiter,
  defaultRateLimiter,
} = require('../utils/rateLimiter');

// 게스트 요청 제한을 위한 미들웨어 추가
const checkGuestRateLimiter = (req, res, next) => {
  const userEmail = req.user?.email;
  if (userEmail === 'guest@example.com') {
    return guestRateLimiter(req, res, next); // 게스트 계정일 경우
  }
  return next(); // 일반 사용자일 경우 제한 없음
};

module.exports = checkGuestRateLimiter;
