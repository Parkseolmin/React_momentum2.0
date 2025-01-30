import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from 'react-icons/fa';
import styles from './AddTodo.module.css';
import { useDispatch } from 'react-redux';
import { addTodo } from 'store/features/todos/todosSlice';

export default function AddTodo({ category }) {
  const [text, setText] = useState('');
  // const handleChange = (e) => setText(e.target.value);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (text.trim() !== '') {
  //     onAdd({ id: uuidv4(), text, status: 'active' });
  //     setText('');
  //   }
  // };
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      try {
        //   const response = await api.post('/todos', {
        //     text,
        //     category,
        //     status: 'active',
        //   });
        dispatch(addTodo({ text, category }));
        setText('');

        // onAdd(response.data); // 새로운 투두를 부모로 전달
      } catch (err) {
        console.error('Failed to add todo:', err);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type='text'
        value={text}
        placeholder='오늘 할 일'
        onChange={handleChange}
        className={styles.input}
      />
      <button
        type='submit'
        className={styles.button}
        aria-label='todoAddButton'
      >
        <FaPlus />
      </button>
    </form>
  );
}
