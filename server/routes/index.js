const express = require('express');
const router = express.Router();
const todosRoutes = require('./todos.api');
const userRoutes = require('./user.api');
const dashboardRoutes = require('./dashboard.api');

router.use('/user', userRoutes); // /api/tasks 라우트 연결
router.use('/todos', todosRoutes); // /api/tasks 라우트 연결
router.use('/dashboard', dashboardRoutes); // /api/tasks 라우트 연결

module.exports = router;
