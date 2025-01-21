import { Link } from 'react-router-dom';
import { IoMdTime, IoMdTimer } from 'react-icons/io';

export default function Arrow({ location, itemBoxRef, styles }) {
  return (
    <div className={styles.itmeBox} ref={itemBoxRef}>
      <Link
        to={'/'}
        className={location.pathname === '/' ? `${styles.active}` : ''}
      >
        <IoMdTime />
      </Link>
      <Link
        to={'/pomodoro'}
        className={location.pathname === '/pomodoro' ? `${styles.active}` : ''}
      >
        <IoMdTimer />
      </Link>
    </div>
  );
}
