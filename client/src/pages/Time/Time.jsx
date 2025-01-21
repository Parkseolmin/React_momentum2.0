import styles from './Time.module.css';
import Search from 'components/Search/Search';
import { useLocation } from 'react-router-dom';
import { useOptionContext } from 'context/OptionContext';
import FamousSaying from 'components/FamousSaying/FamousSaying';
import ClockDisplay from 'components/Time/ClockDisplay';
import { useCallback, useMemo } from 'react';

export default function Time() {
  const location = useLocation();
  const { showItemBox, setShowItemBox, itemBoxRef, clockRef } =
    useOptionContext();

  const memoizedSetShowItemBox = useCallback(
    () => setShowItemBox((prev) => !prev),
    [setShowItemBox]
  );

  const memoizedProps = useMemo(
    () => ({
      location,
      showItemBox,
      setShowItemBox: memoizedSetShowItemBox,
      itemBoxRef,
      clockRef,
    }),
    [location, showItemBox, memoizedSetShowItemBox, itemBoxRef, clockRef]
  );

  return (
    <div className={styles.clockContainer}>
      <ClockDisplay {...memoizedProps} />
      <FamousSaying />
      <Search />
    </div>
  );
}
