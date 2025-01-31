import { useEffect, useState } from 'react';
import { useTodos } from 'context/TodosContext';
import { Input, Button } from 'antd';
import styles from './UserInput.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedTodayTodos } from 'store/features/todos/todosSlice';
const { TextArea } = Input;

export default function UserInput({ onSubmit }) {
  const [userInput, setUserInput] = useState('');
  const handleUserInput = (e) => setUserInput(e.target.value);
  const handleClick = () => onSubmit(userInput);

  const dispatch = useDispatch();
  const completedToday = useSelector(
    (state) => state.todos.byCategory.completedToday,
  );

  useEffect(() => {
    dispatch(fetchCompletedTodayTodos());
  }, [dispatch]);

  const handleTodosSubmit = () => {
    if (completedToday.length === 0) {
      alert('완료된 할 일이 없습니다.');
      return;
    }
    const todoTextList = completedToday.map((todo) => todo.text);
    onSubmit(todoTextList);
  };

  return (
    <>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder='오늘 일어난 일들을 간단히 적어주세요.'
      />
      <div className={styles.btnContainer}>
        <Button onClick={handleTodosSubmit} className={styles.submitBtn}>
          TODO에 대해서
        </Button>
        <Button onClick={handleClick} className={styles.submitBtn}>
          한 일에 대해서
        </Button>
      </div>
    </>
  );
}
