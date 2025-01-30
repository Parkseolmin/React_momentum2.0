import styles from './Header.module.css';
import { MdNightlightRound } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import { useDarkModeContext } from 'context/DarkModeContext';

export default function Header({
  category,
  filters,
  filterCategory,
  setFilterCategory,
}) {
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
        {filters.map((f, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filterCategory === f && styles.selected
              }`}
              key={`${category}-${f}`}
              onClick={() => setFilterCategory(f)}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
