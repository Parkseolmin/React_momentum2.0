import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restoreUser } from './features/user/userSlice';
import Loading from 'components/Loading/Loading';

export default function AuthProvider({ children }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.log('로그인 페이지로 리디렉션!');
      navigate('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    } else if (!user) {
      console.log('사용자 복원!');
      dispatch(restoreUser()); // 사용자 복원 (비동기로 상태 관리)
    }
  }, [dispatch, user, navigate]);

  if (!user) {
    return <Loading />;
  }

  return children;
}
