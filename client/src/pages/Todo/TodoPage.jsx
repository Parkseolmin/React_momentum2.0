import TodoList from 'components/Todo/TodoList/TodoList';
import styles from './TodoPage.module.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from 'components/Todo/Header/Header';
import Tab from 'components/Todo/Tab/Tab';
import { useSelector } from 'react-redux';
import Popup from 'components/Todo/Popup/Popup';

export default function TodoPage() {
  const filters = ['all', 'active', 'completed'];
  const [filterToday, setFilterToday] = useState(filters[0]);
  const [filterWork, setFilterWork] = useState(filters[0]);
  const [activeTab, setActiveTab] = useState('Today');
  // const [filter, setFilter] = useState(filters[0]);
  const user1 = useSelector((state) => state.auth);
  const user2 = useSelector((state) => state.auth.user);
  console.log('user1::', user1);
  console.log('user2::', user2);
  return (
    <>
      <Helmet>
        <title>Momentum | TODO</title>
        <link
          rel='canonical'
          href='https://react-momentum-one.vercel.app/todo'
        />
      </Helmet>
      <Popup />
      <section className={styles.todoContainer}>
        {/* 탭 버튼 */}
        <Tab setActiveTab={setActiveTab} />

        {/* 조건부 렌더링 */}
        {activeTab === 'Today' && (
          <div className={styles.todoContent}>
            <Header
              category='today'
              filters={filters}
              filterCategory={filterToday}
              setFilterCategory={setFilterToday}
            />
            <TodoList category='today' filter={filterToday} />
          </div>
        )}

        {activeTab === 'Schedule' && (
          <div className={styles.todoContent}>
            <Header
              category='work'
              filters={filters}
              filterCategory={filterWork}
              setFilterCategory={setFilterWork}
            />
            <TodoList category='work' filter={filterWork} />
          </div>
        )}
      </section>
    </>
  );
}
