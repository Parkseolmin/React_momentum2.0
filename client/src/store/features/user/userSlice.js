import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

// 사용자 복원 비동기 액션 (Zustand의 restoreUser 대체)
export const restoreUser = createAsyncThunk(
  'user/restoreUser',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/user/me'); // 서버에서 사용자 정보 가져오기
      return response.data; // 성공 시 user 데이터 반환
    } catch (err) {
      localStorage.removeItem('accessToken'); // 실패 시 토큰 삭제
      return thunkAPI.rejectWithValue(err.message); // 에러 처리
    }
  },
);

// 사용자 상태 관리 슬라이스 정의
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // 사용자 정보
    status: 'idle', // 요청 상태: idle, loading, succeeded, failed
    error: null, // 에러 메시지
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user; // 사용자 정보 저장
      if (action.payload.token) {
        localStorage.setItem('accessToken', action.payload.token); // 토큰 저장
      }
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    clearUser: (state) => {
      state.user = null; // 사용자 정보 초기화
      localStorage.removeItem('accessToken'); // 토큰 삭제
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreUser.pending, (state) => {
        console.log('restoreUser 요청 중...');
        state.status = 'loading';
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        console.log('restoreUser 성공:', action.payload); // 응답 데이터 확인
        state.status = 'succeeded';
        state.user = action.payload; // 응답 데이터를 사용자 상태로 설정
      })
      .addCase(restoreUser.rejected, (state, action) => {
        console.log('restoreUser 실패:', action.payload);
        state.status = 'failed';
        state.error = action.payload; // 에러 메시지 저장
      });
  },
});

export const { setUser, clearUser } = userSlice.actions; // 액션 추출
export default userSlice.reducer;
