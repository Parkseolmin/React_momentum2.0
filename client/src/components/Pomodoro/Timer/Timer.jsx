import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from 'react';
import { SettingsContext } from 'context/SettingsContext';
import SettingButton from '../SettingButton/SettingButton';
import PlayButton from '../PlayButton/PlayButton';
import PauseButton from '../PauseButton/PauseButton';
import styles from './Timer.module.css';
import { useOptionContext } from 'context/OptionContext';
import Arrow from 'components/Arrow/Arrow';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { useTimer } from 'hooks/useTimer';

const workTimeColor = 'rgba(255, 255, 255, 0.3)';
const breakTimeColor = 'rgba(106, 164, 199, 0.5)';

export default function Timer() {
  const { workMinutes, breakMinutes, setShowSettings } =
    useContext(SettingsContext);
  const Timer = useTimer(workMinutes, breakMinutes);
  const { showItemBox, setShowItemBox, itemBoxRef, clockRef } =
    useOptionContext();
  const location = useLocation();

  return (
    <div className={styles.progressBox} ref={clockRef}>
      {/* changeArrow */}
      <span
        className={styles.changeArrow}
        onClick={() => setShowItemBox(!showItemBox)}
      >
        <FaArrowRightArrowLeft />
      </span>

      {showItemBox && (
        <Arrow location={location} itemBoxRef={itemBoxRef} styles={styles} />
      )}

      <div className={styles.modeChangeBtn}>
        {/* Focus 버튼: work 모드로 전환 */}
        <button
          onClick={() => Timer.switchMode('work')}
          className={styles.focusButton}
        >
          Focus
        </button>

        {/* Break 버튼: break 모드로 전환 */}
        <button
          onClick={() => Timer.switchMode('break')}
          className={styles.breakButton}
        >
          Break
        </button>
      </div>

      {/* progress */}
      <CircularProgressbarWithChildren
        value={Timer.percentage}
        text={`${Timer.minutes}:${Timer.seconds}`}
        styles={buildStyles({
          textColor: '#fff',
          pathColor: Timer.mode === 'work' ? workTimeColor : breakTimeColor,
          trailColor: 'transparent',
        })}
        className={
          Timer.Timermode === 'work'
            ? `${styles.circularProgressbarWorkMode}`
            : `${styles.circularProgressbarBreakMode}`
        }
      >
        <div
          style={{
            width: '90%',
          }}
        >
          <CircularProgressbar
            value={Timer.innerPercentage}
            styles={buildStyles({
              pathColor: Timer.mode === 'work' ? workTimeColor : breakTimeColor,
              trailColor: 'transparent',
            })}
            className={
              Timer.mode === 'work'
                ? `${styles.circularProgressbarWorkMode}`
                : `${styles.circularProgressbarBreakMode}`
            }
          />
        </div>

        <div className={styles.btnbox}>
          {Timer.isPaused ? (
            <PlayButton onClick={Timer.togglePause} />
          ) : (
            <PauseButton onClick={Timer.togglePause} />
          )}
        </div>
      </CircularProgressbarWithChildren>

      <div className={styles.settingBtn}>
        <SettingButton onClick={() => setShowSettings(true)} />
      </div>
    </div>
  );
}
