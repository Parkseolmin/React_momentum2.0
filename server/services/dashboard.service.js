const Todo = require('../models/Todo');

// 전체 및 카테고리별 통계 데이터 가져오기
const getSummary = async (userId) => {
  // 사용자 ID로 필터링된 전체 할 일 가져오기
  const todos = await Todo.find({ author: userId });

  const total = todos.length; // 전체 할 일 개수
  const completed = todos.filter((todo) => todo.status === 'completed').length; // 완료된 할 일 개수
  const active = total - completed; // 미완료 할 일 개수
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0; // 전체 완료율 (정수)

  // "오늘(today)" 카테고리 통계
  const todayTodos = todos.filter((todo) => todo.category === 'today');
  const todayTotal = todayTodos.length;
  const todayCompleted = todayTodos.filter(
    (todo) => todo.status === 'completed',
  ).length;
  const todayCompletionRate =
    todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

  // "작업(work)" 카테고리 통계
  const workTodos = todos.filter((todo) => todo.category === 'work');
  const workTotal = workTodos.length;
  const workCompleted = workTodos.filter(
    (todo) => todo.status === 'completed',
  ).length;
  const workCompletionRate =
    workTotal > 0 ? Math.round((workCompleted / workTotal) * 100) : 0;

  return {
    total,
    completed,
    active,
    completionRate,
    categories: {
      today: {
        total: todayTotal,
        completed: todayCompleted,
        completionRate: todayCompletionRate,
      },
      work: {
        total: workTotal,
        completed: workCompleted,
        completionRate: workCompletionRate,
      },
    },
  };
};

module.exports = { getSummary };
