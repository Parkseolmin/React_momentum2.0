const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

const userController = {};

// 회원가입 처리
userController.createUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const newUser = await userService.createUser({ email, name, password });
  res.status(201).json(newUser);
});

// 로그인 처리
userController.loginWithEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, tokens } = await userService.loginWithEmail(email, password);
  res.status(200).json({ status: 'success', user, tokens });
});

// 로그아웃(B안): 유효한 accessToken이어야 서버 정리가 가능
userController.logout = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  await userService.revokeAllRefreshToken(userId);
  return res.status(204).send();
});

// 사용자 정보 조회
userController.getUser = asyncHandler(async (req, res) => {
  const { userId } = req.user; // 인증 미들웨어로부터 전달된 userId
  const user = await userService.getUserById(userId);
  res.status(200).json(user);
});

// Refresh Token을 통해 Access Token 재발급
userController.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const newTokens = await userService.refreshAccessToken(refreshToken);
  if (!newTokens) {
    return res.status(403).json({ message: 'Invalid refresh Token' });
  }

  res.status(200).json(newTokens);
});

module.exports = userController;
