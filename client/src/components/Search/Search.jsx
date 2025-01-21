import { useState } from 'react';
import { FaGoogle, FaSearch } from 'react-icons/fa';
import styles from './Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const googleSearch = () => ({
    action: 'https://www.google.com/search',
    method: 'GET',
    target: '_blank',
  });

  const handleChange = (e) => setQuery(e.target.value);
  return (
    <form {...googleSearch()} className={styles.form}>
      <div className={styles.formInner}>
        <span>
          <FaGoogle />
        </span>
        <input
          id='searchInput'
          type='text'
          name='q'
          value={query}
          onChange={handleChange}
          placeholder='Search'
          className={styles.input}
        />
        <button className={styles.formBtn} aria-label='Search'>
          <FaSearch />
        </button>
      </div>
    </form>
  );
}
