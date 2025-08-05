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

api.interceptors.response.use(
  (response) => {
    console.log('✅ [RESPONSE]', response.status, response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn('🔁 [INTERCEPTOR] AccessToken 만료됨, Refresh 시도 중...');

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const res = await plainAxios.post(`${primaryBaseURL}/user/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefresh } = res.data;

          localStorage.setItem('accessToken', accessToken);
          if (newRefresh) {
            localStorage.setItem('refreshToken', newRefresh);
          }

          // 헤더 갱신
          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          console.log('🔓 [REFRESH SUCCESS] 토큰 갱신 완료! 요청 재시도 중...');
          return api(originalRequest);
        } catch (refreshError) {
          console.error('❌ [REFRESH FAILED]', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          // 여기서 redirect('/login') 또는 reject
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
          return Promise.reject(refreshError);
        }
      }
    }

    console.error('❌ [RESPONSE ERROR]', error);

    return Promise.reject(error);
  },
);

export default api;
