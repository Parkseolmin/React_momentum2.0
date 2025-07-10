import axios from 'axios';

// ✅ 기본 및 대체 API 서버 주소
const primaryBaseURL = process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}/api` // 배포된 환경
  : 'http://localhost:5000/api'; // 로컬 환경 기본값

const fallbackBaseURL = 'http://localhost:5000/api'; // 로컬 서버

// ✅ 현재 연결된 서버 로그 출력
console.log(`🌐 Primary Base URL: ${primaryBaseURL}`);
console.log(`🌐 Fallback Base URL: ${fallbackBaseURL}`);

// ✅ Axios 인스턴스 생성
const api = axios.create({
  baseURL: primaryBaseURL, // 기본적으로 배포된 서버로 시작
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: 토큰 추가 및 요청 로깅
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('🚀 [REQUEST] Sending to:', config.baseURL + config.url); // 요청 주소 출력
    return config;
  },
  (error) => {
    console.error('❌ [REQUEST ERROR]:', error);
    return Promise.reject(error);
  },
);

// ✅ 응답 인터셉터: 응답 로깅 및 에러 처리
api.interceptors.response.use(
  (response) => {
    console.log(
      '✅ [RESPONSE] From:',
      response.config.baseURL + response.config.url,
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const res = await api.post('/user/refresh', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = res.data;

          localStorage.setItem('accessToken', accessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch (err) {
          console.error('❌ [TOKEN REFRESH ERROR]:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }

    if (
      originalRequest.baseURL === primaryBaseURL &&
      !originalRequest._retry &&
      (!error.response || error.response.status >= 500)
    ) {
      console.warn(
        '⚠️ [ERROR] Primary server failed. Retrying with local server...',
      );
      originalRequest._retry = true;
      originalRequest.baseURL = fallbackBaseURL;
      console.log(
        '🔄 [RETRY] Switching to:',
        fallbackBaseURL + originalRequest.url,
      );
      return api(originalRequest);
    }

    console.error('❌ [RESPONSE ERROR]:', error);
    return Promise.reject(error);
  },
);

export default api;
