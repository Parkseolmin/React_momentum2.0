import styles from './Loading.module.css';

export default function Loading({ text = 'Loading...' }) {
  return (
    <>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>{text}</p>
      </div>
    </>
  );
}
