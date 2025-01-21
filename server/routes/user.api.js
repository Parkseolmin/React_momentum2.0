const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// 인증이 필요한 유저 정보 조회 라우트
router.get('/me', authMiddleware, userController.getUser);

// 로그인, 계정 생성
router.post('/login', userController.loginWithEmail);
router.post('/', userController.createUser);

module.exports = router;
