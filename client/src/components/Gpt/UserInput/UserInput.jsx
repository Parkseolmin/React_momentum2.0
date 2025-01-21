import { useState } from 'react';
import { useTodos } from 'context/TodosContext';
import { Input, Button } from 'antd';
import styles from './UserInput.module.css';
const { TextArea } = Input;

export default function UserInput({ onSubmit }) {
  const [userInput, setUserInput] = useState('');
  const handleUserInput = (e) => setUserInput(e.target.value);

  const { todos } = useTodos();
  let todolist = todos.map((todo) => todo.text);
  const handleTodoClick = () => onSubmit(todolist);

  const handleClick = () => onSubmit(userInput);

  return (
    <>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder='오늘 일어난 일들을 간단히 적어주세요.'
      />
      <div className={styles.btnContainer}>
        <Button onClick={handleTodoClick} className={styles.submitBtn}>
          TODO에 대해서
        </Button>
        <Button onClick={handleClick} className={styles.submitBtn}>
          한 일에 대해서
        </Button>
      </div>
    </>
  );
}
