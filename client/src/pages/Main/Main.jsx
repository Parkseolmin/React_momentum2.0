import Loading from 'components/Loading/Loading';
import Navbar from 'components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { useBackgroundImage } from 'hooks/useBackgroundImage';
import { TodosProvider } from 'context/TodosContext';
import { DarkModeProvider } from 'context/DarkModeContext';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

export default function Main() {
  const { isLoading, error, backgroundImageUrl } = useBackgroundImage();
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState(location.pathname); // 현재 페이지 경로
  const [isAnimating, setIsAnimating] = useState(false); // 로그인 후 배경 애니메이션
  const [isFadingOut, setIsFadingOut] = useState(false); // 페이지 사라짐 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ 로그인 상태 관리

  // Navbar를 숨기고 싶은 경로 목록
  const pathsWithoutNavbar = ['/login', '/register'];
  const hideNavbar = pathsWithoutNavbar.includes(location.pathname);

  // ✅ 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // 토큰 존재 여부로 로그인 상태 설정
  }, [location.pathname]); // 경로 변경 시마다 확인

  // ✅ 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 리디렉션
  };

  // 로그인 후 배경 확대 애니메이션
  useEffect(() => {
    if (!hideNavbar) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000); // 애니메이션 지속 시간
      return () => clearTimeout(timer);
    }
  }, [hideNavbar]);

  // 페이지 전환 애니메이션 처리
  useEffect(() => {
    if (currentPath !== location.pathname) {
      // 새 경로로 이동 시 애니메이션 트리거
      setIsFadingOut(true);

      // 애니메이션 종료 후 경로 변경
      setTimeout(() => {
        setIsFadingOut(false);
        setCurrentPath(location.pathname);
      }, 300); // 500ms는 CSS에서 정의한 트랜지션 시간
    }
  }, [location.pathname, currentPath]);

  if (isLoading) return <Loading />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <main
      className={`mainBackground ${isAnimating ? 'animate-bg' : ''}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Helmet>
        <title>Momentum</title>
        <link rel='canonical' href='https://react-momentum-one.vercel.app/' />
      </Helmet>

      {/* 조건부로 Navbar 렌더링 */}
      {!hideNavbar && <Navbar />}

      {isLoggedIn && (
        <button onClick={handleLogout} className='logoutButton'>
          Logout
        </button>
      )}

      <DarkModeProvider>
        <TodosProvider>
          {/* 애니메이션 클래스 적용 */}
          <section
            className={`sectionBackground ${
              isFadingOut ? 'fade-out' : 'fade-in'
            }`}
          >
            {/* 현재 경로에 해당하는 컴포넌트만 렌더링 */}
            {currentPath === location.pathname && <Outlet />}
          </section>
        </TodosProvider>
      </DarkModeProvider>
    </main>
  );
}
