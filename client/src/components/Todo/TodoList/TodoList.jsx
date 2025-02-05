import { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
// import { useTodos } from 'context/TodosContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  fetchTodayTodos,
  fetchTodos,
  updateTodo,
} from 'store/features/todos/todosSlice';
import SearchInput from '../SearchInput/SearchInput';

export default function TodoList({ category, filter }) {
  const dispatch = useDispatch();
  // 리덕스 상태에서 필요한 데이터 가져오기
  const todos = useSelector((state) => state.todos.byCategory[category] || []);
  const error = useSelector((state) => state.todos.error);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const user = useSelector((state) => state.user.user);

  console.log('user', user);
  useEffect(() => {
    if (category === 'today') {
      dispatch(fetchTodayTodos({ category, filter, search }));
    } else {
      dispatch(fetchTodos({ category, filter, search }));
    }
  }, [dispatch, category, search, filter]);

  if (error) return <p>Error : {error}</p>;

  const handleUpdate = async (updated) => {
    dispatch(updateTodo(updated));
    setEditingId(null);
  };

  const handleDelete = async (deleted) => {
    dispatch(deleteTodo({ id: deleted.id, category }));
  };

  return (
    <section className={styles.container}>
      <SearchInput search={search} onSearchChange={setSearch} />

      {/* 조건부 팝업 */}
      {category === 'today' && todos.length === 0 && (
        <div className={styles.popup}>
          <img
            src='/images/momentumLogo.png' // 이미지 경로
            alt='아무런 투두가 없습니다.'
            className={styles.popupImage}
          />
          <h3>하루에 집중하세요.</h3>
          <p>매일 새로 고침되는 목록인 나의 하루</p>
          <p>로 작업을 완료하세요.</p>
        </div>
      )}

      <ul className={styles.list}>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isEditing={editingId === todo.id}
              setEditing={setEditingId}
            />
          );
        })}
      </ul>
      <AddTodo category={category} />
    </section>
  );
}
