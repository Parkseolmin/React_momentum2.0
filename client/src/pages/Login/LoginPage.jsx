import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { setUser } from 'store/features/user/userSlice';
import api from 'api/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux 상태에서 사용자 정보 가져오기
  const user = useSelector((state) => state.auth.user);

  // 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken || user) {
      navigate(location.state?.from || '/'); // 이전 페이지 또는 기본 경로로 이동
    }
  }, [navigate, location.state, user]);

  // 알람 재생 함수
  const playSound = (type, callback) => {
    const audio = new Audio(
      type === 'success' ? '/audio/successAlarm.mp3' : '/audio/errorAlarm.mp3',
    );
    audio.volume = 0; // 볼륨 초기값 0
    audio.play();

    // 페이드인 효과
    const fadeIn = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + 0.1, 0.5); // 볼륨을 10%씩 증가
      } else {
        clearInterval(fadeIn);
      }
    }, 100); // 100ms 간격으로 볼륨 증가

    // 재생 완료 시 콜백 실행
    if (callback) {
      audio.onended = callback;
    }
  };

  // 공통 로그인 로직
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.status === 200) {
        const { user: userData, tokens } = response.data;

        // 토큰은 로컬스토리지에 저장(인터셉터가 사용)
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        // 사용자 상태만 Redux에 저장
        dispatch(setUser(userData)); // Redux 상태에 사용자 정보 저장

        // Redux 상태 저장 후 성공 알람 재생 및 리디렉션
        playSound('success', () => navigate('/')); // 성공 알람 재생 후 리디렉션
      } else {
        setError(response.data.message || '로그인 실패.');
        playSound('error'); // 실패 알람음
      }
    } catch (err) {
      setError(
        err.response?.data?.message || '서버와의 연결에 문제가 발생했습니다.',
      );
      playSound('error'); // 실패 알람음
    }
  };

  // 사용자 입력 기반 로그인
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      playSound('error'); // 실패 알람음
      return;
    }

    handleLogin({ email, password });
  };

  // 게스트 계정으로 로그인
  const handleGuestLogin = () => {
    handleLogin({ email: 'guest@example.com', password: 'password123' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Hello!
          <br />
          What's your account?
        </h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className={styles.input}
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className={styles.input}
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className={styles.button}>
            로그인
          </button>
        </form>
        <p className={styles.register}>
          계정이 없으신가요?{' '}
          <span onClick={() => navigate('/register')} className={styles.link}>
            회원가입
          </span>
        </p>
        <button onClick={handleGuestLogin} className={styles.gestBtn}>
          체험하기
        </button>
      </div>
    </div>
  );
}
