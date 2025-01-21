const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

const userController = {};

userController.createUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const newUser = await userService.createUser({ email, name, password });
  res.status(201).json(newUser);
});

userController.loginWithEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, tokens } = await userService.loginWithEmail(email, password);
  res.status(200).json({ status: 'success', user, tokens });
});

userController.getUser = asyncHandler(async (req, res) => {
  const { userId } = req.user; // 인증 미들웨어로부터 전달된 userId
  const user = await userService.getUserById(userId);
  res.status(200).json(user);
});

module.exports = userController;
