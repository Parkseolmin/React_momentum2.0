const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// 인증이 필요한 유저 정보 조회 라우트
router.get('/me', authMiddleware, userController.getUser);
router.post('/login', userController.loginWithEmail);

// 공개
router.post('/logout', authMiddleware, userController.logout);
router.post('/refresh', userController.refreshToken);
router.post('/', userController.createUser);

module.exports = router;
