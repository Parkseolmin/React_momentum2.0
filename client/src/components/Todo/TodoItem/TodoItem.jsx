import { useEffect, useRef } from 'react';
import styles from './TodoItem.module.css';
import { LuDelete } from 'react-icons/lu';
export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo;
  const listItemRef = useRef(null);

  const handleChange = (e) => {
    const newStatus = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status: newStatus });
  };
  const handleDelete = () => onDelete(todo);
  useEffect(() => {
    if (listItemRef.current) {
      listItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [todo]);
  return (
    <li className={styles.todo} ref={listItemRef}>
      <input
        className={styles.checkbox}
        type='checkbox'
        id={id}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`${styles.text} ${
          status === 'completed' && styles.completed
        }`}
      >
        {text}
      </label>
      <button
        onClick={handleDelete}
        className={styles.button}
        aria-label='todoDeleteButton'
      >
        <LuDelete />
      </button>
    </li>
  );
}
