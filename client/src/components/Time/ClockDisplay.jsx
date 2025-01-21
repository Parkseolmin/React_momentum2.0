import { memo } from 'react';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import Arrow from 'components/Arrow/Arrow';
import styles from '../../pages/Time/Time.module.css';
import { useTime } from 'hooks/useTime';

const ClockDisplay = memo(
  ({ showItemBox, setShowItemBox, location, clockRef, itemBoxRef }) => {
    const time = useTime();

    return (
      <div className={styles.clock} ref={clockRef}>
        <span
          className={styles.changeArrow}
          onClick={() => setShowItemBox(!showItemBox)}
        >
          <FaArrowRightArrowLeft />
        </span>
        {showItemBox && (
          <Arrow location={location} itemBoxRef={itemBoxRef} styles={styles} />
        )}
        {time}
      </div>
    );
  }
);

export default ClockDisplay;
