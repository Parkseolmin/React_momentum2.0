import TodoList from 'components/Todo/TodoList/TodoList';
import styles from './TodoPage.module.css';
import { useState } from 'react';
import Header from 'components/Todo/Header/Header';
import { Helmet } from 'react-helmet-async';

export default function TodoPage() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <Helmet>
        <title>Momentum | TODO</title>
        <link
          rel='canonical'
          href='https://react-momentum-one.vercel.app/todo'
        />
      </Helmet>
      <section className={styles.TodoContainer}>
        <Header filters={filters} filter={filter} onFilterChange={setFilter} />
        <TodoList filter={filter} />
      </section>
    </>
  );
}
