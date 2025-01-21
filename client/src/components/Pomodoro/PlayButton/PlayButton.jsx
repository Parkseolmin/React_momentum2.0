import styles from './PlayButton.module.css';

export default function PlayButton(props) {
  return (
    <button {...props} className={styles.playbtn}>
      <p>START</p>
    </button>
  );
}
