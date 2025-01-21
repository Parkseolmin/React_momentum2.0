import { createContext, useContext, useEffect, useReducer } from 'react';
import { todoReducer } from 'reducer/todoReducer';

const TodosContext = createContext();

// 초기 상태를 설정하는 함수
function init() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, null, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
