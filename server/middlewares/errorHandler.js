module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err.stack); // 에러 로그 출력
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};
