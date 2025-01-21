import styles from './Header.module.css';
import { MdNightlightRound } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import { useDarkModeContext } from 'context/DarkModeContext';

export default function Header({ filters, filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkModeContext();
  return (
    <header className={styles.header}>
      <button
        onClick={toggleDarkMode}
        className={styles.toggle}
        aria-label='themeButton'
      >
        {darkMode ? <MdNightlightRound /> : <IoSunny />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => {
          return (
            <li key={index}>
              <button
                className={`${styles.filter} ${
                  filter === value && styles.selected
                }`}
                onClick={() => onFilterChange(value)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
