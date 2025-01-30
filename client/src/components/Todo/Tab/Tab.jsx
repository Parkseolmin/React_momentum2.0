import styles from './Tab.module.css';

export default function Tab({ setActiveTab }) {
  return (
    <div className={styles.TabContainer}>
      <button onClick={() => setActiveTab('Today')}>Today</button>
      <button onClick={() => setActiveTab('Schedule')}>Schedule</button>
    </div>
  );
}
