import axios from 'axios';

const primaryBaseURL = process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}/api`
  : 'http://localhost:5000/api';

const fallbackBaseURL = 'http://localhost:5000/api';

console.log(`🌐 Primary Base URL: ${primaryBaseURL}`);
console.log(`🌐 Fallback Base URL: ${fallbackBaseURL}`);

// 요청용 인스턴스
const api = axios.create({
  baseURL: primaryBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// refresh 요청만 담당하는 인스턴스
const plainAxios = axios.create();

// 요청 인터셉터: 매 요청마다 accessToken을 헤더에 붙임
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(
      '🚀 [REQUEST]',
      config.method?.toUpperCase(),
      config.baseURL + config.url,
    );
    return config;
  },
  (error) => {
    console.error('❌ [REQUEST ERROR]', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const skipRefresh = originalRequest?.headers?.['x-skip-refresh'] === '1';

    // ✅ 스킵이면 바로 반환 (리프레시 안 함)
    if (error.response?.status === 401 && skipRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // ✅ 리프레시 토큰도 없으면 곧장 로그인으로
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setTimeout(() => (window.location.href = '/login'), 100);
        return Promise.reject(error);
      }

      try {
        const { data } = await plainAxios.post(
          `${primaryBaseURL}/user/refresh`,
          { refreshToken },
        );
        const { accessToken, refreshToken: newRefresh } = data;

        localStorage.setItem('accessToken', accessToken);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setTimeout(() => (window.location.href = '/login'), 100);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
