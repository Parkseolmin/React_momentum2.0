import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

// ==========================
// 비동기 작업 정의 (Async Thunks)
// ==========================

// 오늘 완료된 'today' 카테고리의 투두 가져오기
export const fetchCompletedTodayTodos = createAsyncThunk(
  'todos/fetchCompletedTodayTodos',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/todos/today/completed');
      return response.data; // 완료된 todos 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to fetch completed today todos',
      );
    }
  },
);

//  오늘 할 일을 가져오는 액션
export const fetchTodayTodos = createAsyncThunk(
  'todos/fetchTodayTodos',
  async ({ category = 'today', filter, search }, thunkAPI) => {
    try {
      const response = await api.get(
        `/todos/today?category=${category}&filter=${filter}&search=${search}`,
      );
      return { category, todos: response.data }; // 카테고리별로 할 일 데이터 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to fetch todos',
      );
    }
  },
);

// 모든 할 일 가져오기 (카테고리별)
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ category, filter, search }, thunkAPI) => {
    try {
      const response = await api.get(
        `/todos/search?category=${category}&filter=${filter}&search=${search}`,
      );
      return { category, todos: response.data }; // 카테고리별로 할 일 데이터 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to fetch todos', // 에러 반환
      );
    }
  },
);

// 새로운 할 일을 추가하는 액션
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async ({ text, category }, thunkAPI) => {
    try {
      const response = await api.post('/todos', {
        text,
        category,
        status: 'active',
      });
      return { category, todo: response.data }; // 추가된 할 일 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to add todo', // 에러 반환
      );
    }
  },
);

// 할 일을 수정하는 액션
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo, thunkAPI) => {
    try {
      const response = await api.put(`/todos/${updatedTodo.id}`, {
        text: updatedTodo.text,
        status: updatedTodo.status,
      });
      return response.data; // 수정된 할 일 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to update todo', // 에러 반환
      );
    }
  },
);

// 할 일을 삭제하는 액션
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async ({ id, category }, thunkAPI) => {
    try {
      await api.delete(`/todos/${id}`); // 삭제 API 호출
      return { id, category }; // 삭제된 항목의 ID와 카테고리 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Failed to delete todo', // 에러 반환
      );
    }
  },
);

// ==========================
// Slice 정의
// ==========================
const todosSlice = createSlice({
  name: 'todos', // 슬라이스 이름
  initialState: {
    byCategory: {
      today: [], // "오늘" 할 일
      work: [], // "작업" 할 일
      completedToday: [], // '오늘 완료된' 할 일;
    },
    loading: false, // 로딩 상태
    error: null, // 에러 메시지
  },
  reducers: {
    clearError: (state) => {
      state.error = null; // ✅ 에러 상태 초기화
    },
  }, // 동기적인 리듀서(필요 시 추가)
  extraReducers: (builder) => {
    builder
      // ====== fetchCompeletedTodayTodos 처리 ======
      .addCase(fetchCompletedTodayTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTodayTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.byCategory.completedToday = action.payload;
      })
      .addCase(fetchCompletedTodayTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ====== fetchTodayTodos 처리 ======
      .addCase(fetchTodayTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.byCategory.today = action.payload.todos; // 오늘의 데이터 상태에 저장
      })
      .addCase(fetchTodayTodos.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.payload?.error || 'Failed to fetch todos';
      })
      // ====== fetchTodos 처리 ======
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true; // 로딩 상태 활성화
        state.error = null; // 에러 초기화
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false; // 로딩 상태 비활성화
        state.byCategory[action.payload.category] = action.payload.todos; // 데이터 업데이트
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false; // 로딩 상태 비활성화
        // state.error = action.payload; // 에러 저장
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.payload?.error || 'Failed to fetch todos';
      })

      // ====== addTodo 처리 ======
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        const { category, todo } = action.payload;
        state.byCategory[category] = [...state.byCategory[category], todo]; // 새로운 할 일을 추가
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.error =
          typeof action.payload === 'string'
            ? action.payload // 이미 문자열일 경우 그대로 사용
            : action.payload?.error || 'An unexpected error occurred.'; // 객체에서 메시지 추출
      })

      // ====== updateTodo 처리 ======
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload;
        const category = updatedTodo.category;
        state.byCategory[category] = state.byCategory[category].map(
          (todo) => (todo.id === updatedTodo.id ? updatedTodo : todo), // 수정된 항목만 교체
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====== deleteTodo 처리 ======
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        const { id, category } = action.payload;
        state.byCategory[category] = state.byCategory[category].filter(
          (todo) => todo.id !== id, // 삭제된 항목 제거
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError } = todosSlice.actions;
export default todosSlice.reducer;
