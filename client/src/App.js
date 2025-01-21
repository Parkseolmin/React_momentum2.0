import Loading from 'components/Loading/Loading';
import LoginPage from 'pages/Login/LoginPage';
import RegisterPage from 'pages/Register/RegisterPage';
import React, { Suspense, lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from 'store/AuthProvider';

const TodoPage = lazy(() => import('pages/Todo/TodoPage'));
const PomodoroPage = lazy(() => import('pages/Pomodoro/PomodoroPage'));
const GptPage = lazy(() => import('pages/Gpt/GptPage'));
const Main = lazy(() => import('pages/Main/Main'));
const Time = lazy(() => import('pages/Time/Time'));

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      children: [
        { path: 'login', element: <LoginPage /> }, // 로그인 페이지
        { path: 'register', element: <RegisterPage /> }, // 회원가입 페이지

        {
          path: '/', // 인증이 필요한 하위 페이지
          element: (
            <AuthProvider>
              <Outlet /> {/* 인증된 사용자만 접근 가능한 페이지 */}
            </AuthProvider>
          ),
          children: [
            { index: true, element: <Time /> },
            { path: 'todo', element: <TodoPage /> },
            { path: 'pomodoro', element: <PomodoroPage /> },
            { path: 'gpt', element: <GptPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
