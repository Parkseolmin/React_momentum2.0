import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

// ==========================
// 비동기 작업 정의 (Async Thunks)
// ==========================
export const fetchSummary = createAsyncThunk(
  'dashboard/fetchSummary',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/dashboard/summary');
      console.log('fetchSummary가 줜나 궁금하노', response.data);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch summary',
      );
    }
  },
);

// ==========================
// Slice 정의
// ==========================
// boardSlice 정의
const boardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    summary: {
      total: 0,
      completed: 0,
      active: 0,
    },
    loading: false, // 로딩 상태
    error: null, // 에러 메시지
  },
  reducers: {}, // 동기적인 리듀서 추가 가능
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.loading = true;
        state.error = null; // 이전 에러 초기화
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload; // 서버에서 받은 요약 데이터로 업데이트
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // 에러 메시지 저장
      });
  },
});

export default boardSlice.reducer;
