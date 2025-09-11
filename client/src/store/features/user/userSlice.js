import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

// 공통 정리 유틸
const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// 사용자 복원 비동기 액션 (Zustand의 restoreUser 대체)
export const restoreUser = createAsyncThunk(
  'user/restoreUser',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/user/me'); // 서버에서 사용자 정보 가져오기
      return response.data; // 서버가 주는 유저 객체 { id, name, email }
    } catch (err) {
      clearAuth();
      return thunkAPI.rejectWithValue(err?.response?.data || 'restore failed'); // 에러 처리
    }
  },
);

// 로그아웃 : 이 요청에는 x-skip-refresh 헤더를 달아 리프레시를 막는다.
export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post(
        '/user/logout',
        { refreshToken: localStorage.getItem('refreshToken') },
        { headers: { 'x-skip-refresh': '1' } },
      );
      return true;
    } catch (err) {
      // 서버 실패해도 클라이언트 정리는 해야해서 reject로 넘김
      return rejectWithValue(err?.response?.data || 'logout failed');
    } finally {
      // 스토리지 정리의 단일 책임지점
      clearAuth();
    }
  },
);

// 사용자 상태 관리 슬라이스 정의
const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // { id, name, email }
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // 에러 메시지
  },
  reducers: {
    // 순수 상태 업데이트 (토큰 저장 x)
    setUser: (state, action) => {
      // 정규화 : payload가 { user: {...} }든 {...}든 평평한 유저 데이터객체 }
      state.user = action.payload?.user ?? action.payload; // { id, name, email }
      console.log('setUser 페이로드 값 상태를 보자 : ', action.payload);
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 복원
      .addCase(restoreUser.pending, (state) => {
        console.log('restoreUser 요청 중...');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        console.log('restoreUser 성공:', action.payload); // 응답 데이터 확인
        state.status = 'succeeded';
        state.user = action.payload; // 응답 데이터를 사용자 상태로 설정
      })
      .addCase(restoreUser.rejected, (state, action) => {
        console.log('restoreUser 실패:', action.payload);
        state.status = 'failed';
        state.error = action.payload || 'restore failed'; // 에러 메시지 저장
      })

      // 로그아웃 성공/실패 모두 로컬 정리
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.user = null; // 서버 실패여도 클라 상태는 정리
      });
  },
});

export const { setUser, clearUser } = userSlice.actions; // 액션 추출
export default userSlice.reducer;
