import axios from 'axios';

// ✅ baseURL 설정: 배포 환경과 로컬 환경 자동 감지
const baseURL = process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}/api` // 배포된 환경
  : 'http://localhost:5000/api'; // 로컬 환경

// ✅ 현재 연결된 서버 로그 출력
console.log(`🌐 Axios Base URL: ${baseURL}`);

// ✅ Axios 인스턴스 생성
const api = axios.create({
  baseURL: baseURL,
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
  (error) => {
    console.error('❌ [RESPONSE ERROR]:', error);
    return Promise.reject(error);
  },
);

export default api;
