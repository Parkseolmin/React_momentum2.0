import { useState } from 'react';
import styles from './TodoList.module.css';
import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
import { useTodos } from 'context/TodosContext';

export default function TodoList({ filter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { todos, dispatch } = useTodos();

  const handleAdd = (todo) => {
    dispatch({ type: 'ADD', todo });
  };

  const handleUpdate = (updated) => {
    dispatch({ type: 'UPDATE', updated });
  };

  const handleDelete = (deleted) => {
    dispatch({ type: 'DELETE', deleted });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  function getFilteredItems(filter, searchTerm) {
    if (filter === 'all') {
      if (!searchTerm) {
        return todos;
      } else {
        return todos.filter((todo) =>
          todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    } else {
      if (!searchTerm) {
        return todos.filter((todo) => todo.status === filter);
      } else {
        return todos
          .filter((todo) => todo.status === filter)
          .filter((todo) =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }
    }
  }

  const filtered = getFilteredItems(filter, searchTerm);

  return (
    <section className={styles.container}>
      <input
        className={styles.searchInput}
        type='text'
        placeholder='검색...'
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className={styles.list}>
        {filtered.map((item) => {
          return (
            <TodoItem
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          );
        })}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
