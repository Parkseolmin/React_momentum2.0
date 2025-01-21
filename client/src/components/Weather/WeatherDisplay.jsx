import styles from './WeatherDisplay.module.css';
import Loading from 'components/Loading/Loading';
import { useWeather } from 'hooks/useWeather';

export default function WeatherDisplay() {
  const {
    weather,
    error,
    isPending,
    isLoading,
    handleRefresh,
    weatherIconUrl,
  } = useWeather();

  // if (isPending || isLoading) return <p>로딩 중</p>;
  if (error) return <p>Error: {error.message}</p>;
  // if (!weather) return <p>No weather data available.</p>;
  return (
    <section className={styles.weatherInfo} onClick={handleRefresh}>
      {isLoading || isPending ? (
        <>
          <div className={styles.loadingSpinner}>
            <Loading text='' />
          </div>
        </>
      ) : (
        <>
          <div className={styles.iconTmp}>
            <span>
              {weatherIconUrl && (
                <img
                  src={weatherIconUrl}
                  alt='Weather icon'
                  width='50'
                  height='50'
                />
              )}
            </span>
            <p className={styles.temp}>{Math.floor(weather.main.temp)}°</p>
          </div>
          <p className={styles.weatherName}>{weather.name}</p>
        </>
      )}
    </section>
  );
}
