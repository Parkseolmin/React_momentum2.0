import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { weatherIconMap } from 'data/weatherIcon';
import { useEffect, useState } from 'react';

export const useWeather = () => {
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionError, setPermissionError] = useState(null); // 권한 오류 상태 관리

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (navigator.permissions) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: 'geolocation',
          });

          if (permissionStatus.state === 'granted') {
            // 권한이 이미 허용된 경우
            getCurrentPosition();
          } else if (permissionStatus.state === 'prompt') {
            // 권한 요청을 사용자에게 보여줌
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setCoords({ lat, lon });
              },
              (error) => {
                setPermissionError('위치 권한이 거부되었습니다.');
                console.error('Geolocation error:', error);
              },
            );
          } else {
            setPermissionError('위치 권한이 거부되었습니다.');
          }

          // 권한 상태 변화 감지
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              getCurrentPosition();
            }
          };
        } catch (error) {
          console.error('Permissions API를 사용할 수 없습니다.', error);
        }
      }
    };

    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });
        },
        (error) => {
          setPermissionError('위치 권한이 거부되었습니다.');
          console.error('Geolocation error:', error);
        },
      );
    };

    requestLocationPermission();
  }, []);

  const fetchWeather = async ({ queryKey }) => {
    const [{ lat, lon }] = queryKey;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`;
    const response = await axios(url);
    return response.data;
  };

  const {
    data: weather,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [coords],
    queryFn: fetchWeather,
    enabled: !!coords,
    staleTime: 1000 * 60 * 60,
  });

  const handleRefresh = async () => {
    console.log('클릭됨');
    setIsLoading(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const weatherIconUrl = weather
    ? weatherIconMap[weather.weather[0].icon]
    : null;

  return {
    weather,
    error,
    isPending,
    isLoading,
    handleRefresh,
    weatherIconUrl,
    permissionError, // 권한 오류 상태 반환
  };
};
