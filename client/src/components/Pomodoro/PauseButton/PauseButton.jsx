import styles from './PauseButton.module.css';

export default function PauseButton(props) {
  return (
    <button {...props} className={styles.pausebtn}>
      <p>PAUSE</p>
    </button>
  );
}
