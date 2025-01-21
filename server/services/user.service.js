const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 새로운 사용자 생성 (회원가입)
const createUser = async (userData) => {
  const { email, name, password } = userData;
  console.log('password는 암호화 전 상태:', password);
  // 이메일 중복 확인
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email is already in use');
    error.status = 400;
    throw error;
  }

  // 새로운 사용자 생성
  const newUser = await User.create({ email, name, password }); // 비밀번호 암호화는 User 모델의 pre('save')에서 처리됨
  console.log('password는 암호화 후 상태:', newUser.password);

  // 생성된 사용자 정보 반환
  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

// 사용자 로그인
const loginWithEmail = async (email, password) => {
  // 사용자 존재 여부 확인
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  // 비밀번호 검증
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // 토큰 생성
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
  );

  return {
    user: { id: user.id, name: user.name, email: user.email }, // id는 Virtual Field
    tokens: { accessToken, refreshToken },
  };
};

// 사용자 정보 가져오기
const getUserById = async (userId) => {
  // 사용자 조회
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};

module.exports = {
  createUser,
  loginWithEmail,
  getUserById,
};
