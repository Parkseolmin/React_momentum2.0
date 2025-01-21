const express = require('express');
const todoController = require('../controllers/todos.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// ===========================
// Todos Router
// ===========================
// 수동 트리거로 오늘 데이터 초기화
// - 오늘 이전의 데이터를 수동 트리거 방식으로 초기화
// - 인증된 사용자만 접근 가능
router.get('/reset-today', authMiddleware, todoController.resetTodayTodos);

// ======================================================
// Todos Router - TodoList
// ======================================================

// 검색 기능
// - 카테고리, 검색어, 상태 필터를 사용해 할 일 검색
// - 인증된 사용자만 접근 가능
router.get('/search', authMiddleware, todoController.searchTodos);

// 오늘 작성된 'today' 카테고리 데이터 가져오기
// - 오늘 날짜에 생성된 'today' 카테고리 데이터를 가져옴
// - 인증된 사용자만 접근 가능
router.get('/today', authMiddleware, todoController.searchTodayTodos);

// ======================================================
// Todos Router - C R U D E
// ======================================================

// 모든 할 일 가져오기
// - 특정 카테고리나 모든 데이터를 가져옴
// - 인증 필요 없음
router.get('/', todoController.getTodos);

// 새로운 할 일 추가
// - 사용자 입력을 기반으로 새로운 할 일을 생성
// - 인증된 사용자만 접근 가능
router.post('/', authMiddleware, todoController.createTodo);

// 할 일 업데이트
// - 특정 ID의 할 일을 수정 (텍스트 및 상태)
// - 인증된 사용자만 접근 가능
router.put('/:id', authMiddleware, todoController.updateTodo);

// 할 일 삭제
// - 특정 ID의 할 일을 삭제
// - 인증 필요 없음
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
