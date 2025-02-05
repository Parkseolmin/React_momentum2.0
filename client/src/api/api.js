import axios from 'axios';

// ✅ 기본 및 대체 API 서버 주소
const primaryBaseURL = process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}/api`
  : 'http://localhost:5000/api';

const fallbackBaseURL = 'http://localhost:5000/api';

// ✅ Axios 인스턴스 생성
const api = axios.create({
  baseURL: primaryBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: 요청 전 로깅
api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 [REQUEST] Sending request to: ${config.baseURL}${config.url}`,
    );

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ 응답 인터셉터: 성공/실패 로깅 및 로컬 서버 전환 처리
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [RESPONSE] Success from: ${response.config.baseURL}${response.config.url}`,
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      !originalRequest._retry &&
      (error.code === 'ECONNABORTED' ||
        !error.response ||
        error.response.status >= 500)
    ) {
      console.warn(
        `⚠️ [ERROR] Primary server failed. Retrying with local server...`,
      );

      originalRequest._retry = true;
      originalRequest.baseURL = fallbackBaseURL;

      console.log(
        `🔄 [RETRY] Switching to: ${fallbackBaseURL}${originalRequest.url}`,
      );
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
