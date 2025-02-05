import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // 기본값 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('요청 보냄:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log('응답 받음:', response);
    return response;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  },
);

export default api;
