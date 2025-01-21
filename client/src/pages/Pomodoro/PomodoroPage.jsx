import Setting from 'components/Pomodoro/Setting/Setting';
import Timer from 'components/Pomodoro/Timer/Timer';
import { SettingsContext } from 'context/SettingsContext';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function PomodoroPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <section className='pomodoro'>
      <Helmet>
        <title>Momentum | Pomodoro</title>
        <link
          rel='canonical'
          href='https://react-momentum-one.vercel.app/pomodoro'
        />
      </Helmet>
      <SettingsContext.Provider
        value={{
          showSettings,
          workMinutes,
          breakMinutes,
          setShowSettings,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        {showSettings ? <Setting /> : <Timer />}
      </SettingsContext.Provider>
    </section>
  );
}
