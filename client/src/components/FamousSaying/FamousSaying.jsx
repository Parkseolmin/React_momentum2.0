import Loading from 'components/Loading/Loading';
import useFamousSaying from 'hooks/useFamousSaying ';
import styles from './FamousSaying.module.css';
export default function FamousSaying() {
  const { data, isLoading, fetchSayingManually } = useFamousSaying();
  if (isLoading) return <Loading />;
  return (
    <div onClick={fetchSayingManually} className={styles.sentenceBox}>
      {data && (
        <p className={styles.sentence}>
          {data.message}
          <em className={styles.author}>-{data.author}</em>
        </p>
      )}
    </div>
  );
}
