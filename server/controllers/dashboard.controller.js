const asyncHandler = require('../utils/asyncHandler');
const dashboardService = require('../services/dashboard.service');

const dashboardController = {};

dashboardController.getSummary = asyncHandler(async (req, res) => {
  const { userId } = req.user; // 인증된 사용자 ID
  const summary = await dashboardService.getSummary(userId); // userId 전달
  res.status(200).json(summary);
});

module.exports = dashboardController;
