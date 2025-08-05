const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { redisClient } = require('../config/redis');

// Refresh Token을 Redis에 저장
const addRefreshToken = async (userId, token) => {
  const TTL = 60 * 60 * 24 * 7; // 7일
  const key = `refreshToken:${userId}:${token}`;
  await redisClient.set(key, userId.toString(), 'EX', TTL);
};

// Refresh Token 유효성 검사
const isRefreshTokenValid = async (userId, token) => {
  const key = `refreshToken:${userId}:${token}`;
  const exists = await redisClient.exists(key);
  return exists === 1;
};

// 새로운 사용자 생성 (회원가입)
const createUser = async (userData) => {
  const { email, name, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email is already in use');
    error.status = 400;
    throw error;
  }

  const newUser = await User.create({ email, name, password });
  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

// 사용자 로그인
const loginWithEmail = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
  );

  await addRefreshToken(user._id, refreshToken);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    tokens: { accessToken, refreshToken },
  };
};

// 사용자 정보 가져오기
const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};

// Refresh Token으로 Access Token 재발급 + Refresh Token 로테이션
const refreshAccessToken = async (oldRefreshToken) => {
  try {
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const valid = await isRefreshTokenValid(decoded.userId, oldRefreshToken);
    if (!valid) return null;

    // 기존 토큰 삭제
    // await redisClient.del(`refreshToken:${decoded.userId}:${oldRefreshToken}`);

    // 기존 해당 유저의 모든 refreshToken 제거
    const pattern = `refreshToken:${decoded.userId}:*`;
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) await redisClient.del(keys);

    // 새 토큰 발급
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.REFRESH_TOKEN_SECRET,
    );

    await addRefreshToken(decoded.userId, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    return null;
  }
};

module.exports = {
  createUser,
  loginWithEmail,
  getUserById,
  refreshAccessToken,
};
