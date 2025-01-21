import ReactSlider from 'react-slider';
import { useContext } from 'react';
import { SettingsContext } from 'context/SettingsContext';
import BackButton from '../BackButton/BackButton';
export default function Setting() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div style={{ textAlign: 'center' }}>
      <label className='settinglabel'>
        work time : {settingsInfo.workMinutes}:00
      </label>
      <ReactSlider
        className='slider'
        thumbClassName='thumb'
        trackClassName='track'
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label className='settinglabel'>
        break time : {settingsInfo.breakMinutes}:00
      </label>
      <ReactSlider
        className='slider green'
        thumbClassName='thumb'
        trackClassName='track'
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <BackButton
          onClick={() => settingsInfo.setShowSettings((prev) => !prev)}
        />
      </div>
    </div>
  );
}
