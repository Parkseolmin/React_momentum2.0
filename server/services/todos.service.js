const Todo = require('../models/Todo');
const { getRegExp } = require('korean-regexp');

// ==========================
// 수동 트리거: 오늘 이전의 'today' 카테고리 데이터 초기화
// ==========================
const resetTodayTodos = async () => {
  // 현재 시간을 기준으로 오늘 자정 계산
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 초기화 작업 (데이터 삭제 대신 로그 처리)
  console.log(`수동 트리거 실행 - 기준 시간: ${todayStart}`);
  return { success: true, message: '수동 트리거가 성공적으로 실행되었습니다.' };
};

// ==========================
// 'today' 카테고리에서 오늘 완료된 투두 가져오기
// ==========================
const getCompeletedTodayTodos = async (userId) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  const query = {
    author: userId,
    category: 'today',
    status: 'completed',
    createdAt: { $gte: todayStart, $lt: tomorrowStart }, // 오�� 자정부터 다음 �� 자정 전까지
  };

  return await Todo.find(query).populate('author', 'name email');
};

// ==========================
// 오늘 작성된 'today' 카테고리 데이터 검색
// ==========================
const searchTodayTodos = async (userId, category, search, filter) => {
  const query = { author: userId, category };

  // 'today' 카테고리일 경우 오늘 데이터만 포함
  if (category === 'today') {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const tomorrowStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    query.createdAt = { $gte: todayStart, $lt: tomorrowStart }; // 오늘 자정부터 다음 날 자정 전까지
  }

  // 검색어 필터 적용
  if (search && search.trim() !== '') {
    const regex = getRegExp(search, { initialSearch: true, fuzzy: true });
    query.text = { $regex: regex }; // 검색어 기반 정규식 추가
  }

  // 상태 필터 적용 (active/completed)
  if (filter && filter !== 'all') {
    query.status = filter;
  }

  // 결과 반환
  return await Todo.find(query).populate('author', 'name email');
};

// ==========================
// 할 일 검색
// ==========================
const searchTodos = async (userId, category, search, filter) => {
  const query = { author: userId, category };

  // 검색어 필터 적용
  if (search && search.trim() !== '') {
    const regex = getRegExp(search, { initialSearch: true, fuzzy: true });
    query.text = { $regex: regex }; // 텍스트 필드에서 정규식 검색
  }

  // 상태 필터 적용
  if (filter && filter !== 'all') {
    query.status = filter;
  }

  // 결과 반환
  return await Todo.find(query).populate('author', 'name email');
};

// ==========================
// 모든 할 일 가져오기
// ==========================
const getTodos = async (category) => {
  const query = category ? { category } : {}; // 카테고리 필터 추가
  return await Todo.find(query).populate('author', 'name email');
};

// ==========================
// 새로운 할 일 생성
// ==========================
const createTodo = async (text, category, userId) => {
  if (!text || !userId) {
    const error = new Error('Invalid data for creating todo');
    error.status = 400;
    throw error;
  }

  const newTodo = await Todo.create({ text, category, author: userId });
  return await newTodo.populate('author', 'name email');
};

// ==========================
// 할 일 수정
// ==========================
const updateTodo = async (id, data) => {
  const { text, status } = data;

  // 유효성 검증
  if (!text || typeof text !== 'string' || text.trim() === '') {
    const error = new Error('Invalid or empty text');
    error.status = 400;
    throw error;
  }

  if (!['active', 'completed'].includes(status)) {
    const error = new Error('Status must be "active" or "completed"');
    error.status = 400;
    throw error;
  }

  // Todo 존재 확인
  const existingTodo = await Todo.findById(id);
  if (!existingTodo) {
    const error = new Error('Todo not found');
    error.status = 404;
    throw error;
  }

  // 수정 로직
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { text, status },
    { new: true },
  ).populate('author', 'name email');

  if (!updatedTodo) {
    const error = new Error('Failed to update todo');
    error.status = 500;
    throw error;
  }

  return updatedTodo;
};

// ==========================
// 할 일 삭제
// ==========================
const deleteTodo = async (id) => {
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    const error = new Error('Todo not found');
    error.status = 404;
    throw error;
  }
  return deletedTodo;
};

// ==========================
// 모듈 내보내기
// ==========================
module.exports = {
  getCompeletedTodayTodos,
  resetTodayTodos,
  searchTodayTodos,
  searchTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
