const todoService = require('../services/todos.service');
const asyncHandler = require('../utils/asyncHandler');

const todoController = {};

// 수동 트리거로 오늘 데이터를 초기화
// - 수동으로 호출되는 엔드포인트를 통해 오늘 데이터를 초기화
// - 초기화 로직은 todos.service.js의 resetTodayTodos에서 처리
todoController.resetTodayTodos = asyncHandler(async (req, res) => {
  const result = await todoService.resetTodayTodos(); // 초기화 로직 호출
  res.status(200).json(result); // 결과 반환
});

todoController.getCompletedTodayTodos = asyncHandler(async (req, res) => {
  const { userId } = req.user; // 인증된 사용자 ID
  const completedTodos = await todoService.getCompeletedTodayTodos(userId);
  res.status(200).json(completedTodos);
});

// 오늘 작성된 'today' 카테고리 데이터 가져오기
// - 인증된 사용자 ID와 쿼리 매개변수를 기반으로 데이터를 검색
// - todos.service.js의 searchTodos 메서드를 호출하여 처리
todoController.searchTodos = asyncHandler(async (req, res) => {
  const { userId } = req.user; // 인증된 사용자 정보
  const { category, search, filter } = req.query; // 카테고리, 검색어, 상태 필터
  const todos = await todoService.searchTodos(userId, category, search, filter); // 서비스 호출
  res.status(200).json(todos); // 검색 결과 반환
});

// 검색 (오늘 작성된 'today' 데이터로 제한)
// - 'today' 카테고리에 해당하는 오늘의 데이터를 검색
// - todos.service.js의 searchTodayTodos 메서드를 호출하여 처리
todoController.searchTodayTodos = asyncHandler(async (req, res) => {
  const { userId } = req.user; // 인증된 사용자 정보
  const { category, search, filter } = req.query; // 카테고리, 검색어, 상태 필터
  const todos = await todoService.searchTodayTodos(
    userId,
    category,
    search,
    filter,
  ); // 서비스 호출
  res.status(200).json(todos); // 검색 결과 반환
});

// 모든 할 일 가져오기
// - 쿼리 매개변수에 따라 특정 카테고리의 데이터를 가져옴
// - todos.service.js의 getTodos 메서드를 호출하여 처리
todoController.getTodos = asyncHandler(async (req, res) => {
  const { category } = req.query; // 카테고리 정보
  const todos = await todoService.getTodos(category); // 서비스 호출
  res.status(200).json(todos); // 데이터 반환
});

// 새로운 할 일 생성
// - 클라이언트에서 전달된 텍스트와 카테고리를 기반으로 새로운 할 일을 생성
// - todos.service.js의 createTodo 메서드를 호출하여 처리
todoController.createTodo = asyncHandler(async (req, res) => {
  const { text, category } = req.body; // 요청 본문에서 텍스트와 카테고리 추출
  const { userId } = req.user; // 인증된 사용자 ID
  const newTodo = await todoService.createTodo(text, category, userId); // 서비스 호출
  res.status(201).json(newTodo); // 생성된 데이터 반환
});

// 할 일 업데이트
// - 특정 할 일의 텍스트와 상태를 업데이트
// - todos.service.js의 updateTodo 메서드를 호출하여 처리
todoController.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params; // URL 매개변수에서 할 일 ID 추출
  const { text, status } = req.body; // 요청 본문에서 텍스트와 상태 추출
  const updatedTodo = await todoService.updateTodo(id, { text, status }); // 서비스 호출
  res.status(200).json(updatedTodo); // 수정된 데이터 반환
});

// 할 일 삭제
// - 특정 ID에 해당하는 할 일을 삭제
// - todos.service.js의 deleteTodo 메서드를 호출하여 처리
todoController.deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params; // URL 매개변수에서 할 일 ID 추출
  const deletedTodo = await todoService.deleteTodo(id); // 서비스 호출
  res.status(200).json({ message: 'Todo deleted successfully' }); // 성공 메시지 반환
});

module.exports = todoController;
