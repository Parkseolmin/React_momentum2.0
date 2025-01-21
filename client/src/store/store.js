import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'; // userSlice에서 reducer 가져오기
import todosReducer from './features/todos/todosSlice'; // userSlice에서 reducer 가져오기
import boardReducer from './features/board/boardSlice'; // userSlice에서 reducer 가져오기

const store = configureStore({
  reducer: {
    user: userReducer, // 사용자 상태 관리 슬라이스 추가
    todos: todosReducer,
    board: boardReducer,
  },
});

export default store;
