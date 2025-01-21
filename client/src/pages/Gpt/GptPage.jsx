import { CallGPT } from 'api/gpt';
import { useDarkModeContext } from 'context/DarkModeContext';
import { useState } from 'react';
import styles from './GptPage.module.css';
import { MdNightlightRound } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import UserInput from 'components/Gpt/UserInput/UserInput';
import DiaryDisplay from 'components/Gpt/DiaryDisplay/DiaryDisplay';
import { Helmet } from 'react-helmet-async';

export default function GptPage() {
  const { darkMode, toggleDarkMode } = useDarkModeContext();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // API 호출 함수
  const handleClickAPICall = async (userInput) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      const data = JSON.parse(message);
      setData(data);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 유저 입력 핸들링 함수
  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  };

  return (
    <section className={styles.AIContainer}>
      <Helmet>
        <title>Momentum | Gpt</title>
        <link
          rel='canonical'
          href='https://react-momentum-one.vercel.app/gpt'
        />
      </Helmet>
      <div className={styles.AppContainer}>
        {/* 어두운 모드 토글 버튼 */}
        <div className={styles.AppTitle}>
          <div className={styles.BtnContainer}>
            <button
              onClick={toggleDarkMode}
              className={styles.Btn}
              aria-label='themeButton'
            >
              {darkMode ? <MdNightlightRound /> : <IoSunny />}
            </button>
          </div>
        </div>
        {/* 사용자 입력 컴포넌트 */}
        <UserInput isLoading={isLoading} onSubmit={handleSubmit} />
        {/* 일기 결과 표시 컴포넌트 */}
        <DiaryDisplay data={data} isLoading={isLoading} />
        {/* isLoaing 오타 수정 */}
      </div>
    </section>
  );
}
