import { useState } from 'react';
import useInterval from './useInterval';

export const useTime = () => {
  const [time, setTime] = useState(() => Date.now()); // 밀리초 단위로 관리
  useInterval(() => {
    setTime(Date.now()); // 갱신
  }, 10000);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return formatTime(time);
};
