import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { TodosProvider } from 'context/TodosContext';

describe('TodoList Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterAll(() => {
    delete window.HTMLElement.prototype.scrollIntoView;
  });

  it('Snapshot Test', () => {
    const { asFragment } = render(
      <TodosProvider>
        <TodoList filter='all' />
      </TodosProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders essential components correctly', () => {
    render(
      <TodosProvider>
        <TodoList filter='all' />
      </TodosProvider>
    );

    expect(screen.getByPlaceholderText('검색...')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /todoAddButton/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('adds a new todo to the list when the add button is clicked', () => {
    render(
      <TodosProvider>
        <TodoList filter='all' />
      </TodosProvider>
    );

    const input = screen.getByPlaceholderText('오늘 할 일');
    const addButton = screen.getByRole('button', { name: /todoAddButton/i });

    fireEvent.change(input, { target: { value: 'Learn Testing' } });
    expect(input.value).toBe('Learn Testing');

    fireEvent.click(addButton);
    expect(screen.getByText('Learn Testing')).toBeInTheDocument();
  });

  describe('ADD, UPDATEM, DELETE', () => {
    it('dispatched ADD action with the correct payload', () => {
      const mockDispatch = jest.fn();
      jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
        todos: [],
        dispatch: mockDispatch,
      });

      render(
        <TodosProvider>
          <TodoList filter='all' />
        </TodosProvider>
      );

      const input = screen.getByPlaceholderText('오늘 할 일');
      const addButton = screen.getByRole('button', { name: /todoAddButton/i });

      fireEvent.change(input, { target: { value: 'Learn Testing' } });
      fireEvent.click(addButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD',
        todo: expect.objectContaining({
          text: 'Learn Testing',
          status: 'active',
        }),
      });
    });

    it('should toggle the status of a todo when checkbox is clicked', () => {
      const mockTodos = [{ id: '1', text: 'Learn Testing', status: 'active' }];

      const mockDispatch = jest.fn();
      jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
        todos: mockTodos,
        dispatch: mockDispatch,
      });

      render(
        <TodosProvider>
          <TodoList filter='all' />
        </TodosProvider>
      );

      const checkbox = screen.getByRole('checkbox', { name: /Learn Testing/i });
      fireEvent.click(checkbox);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE',
        updated: { ...mockTodos[0], status: 'completed' },
      });
    });

    it('should delete a todo when delete button is clicked', () => {
      const mockTodos = [{ id: '1', text: 'Learn Testing', status: 'active' }];

      const mockDispatch = jest.fn();
      jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
        todos: mockTodos,
        dispatch: mockDispatch,
      });

      render(
        <TodosProvider>
          <TodoList filter='all' />
        </TodosProvider>
      );

      const deleteButton = screen.getByRole('button', {
        name: /todoDeleteButton/i,
      });
      fireEvent.click(deleteButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'DELETE',
        deleted: mockTodos[0],
      });
    });
  });

  describe('filrers method', () => {
    it('filters todos based on search term', () => {
      // Mock todos before rendering
      const mockTodos = [
        { id: 1, text: 'Learn React', status: 'active' },
        { id: 2, text: 'Learn Testing', status: 'completed' },
        { id: 3, text: 'Write Tests', status: 'active' },
      ];

      jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
        todos: mockTodos,
        dispatch: jest.fn(),
      });

      render(
        <TodosProvider>
          <TodoList filter='all' />
        </TodosProvider>
      );

      const input = screen.getByPlaceholderText('검색...');
      fireEvent.change(input, { target: { value: 'Learn' } });

      // Verify filtered todos
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Learn Testing')).toBeInTheDocument();
      expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
    });

    it('filters todos based on status when no search term is provided', () => {
      const mockTodos = [
        { id: 1, text: 'Learn React', status: 'active' },
        { id: 2, text: 'Learn Testing', status: 'completed' },
        { id: 3, text: 'Write Tests', status: 'active' },
      ];

      jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
        todos: mockTodos,
        dispatch: jest.fn(),
      });

      render(
        <TodosProvider>
          <TodoList filter='completed' />
        </TodosProvider>
      );

      // 'completed' 상태의 todo만 보여야 함
      expect(screen.getByText('Learn Testing')).toBeInTheDocument();
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
    });

    it('filters todos based on status and search term', () => {
      const mockTodos = [
        { id: 1, text: 'Learn React', status: 'active' },
        { id: 2, text: 'Learn Testing', status: 'completed' },
        { id: 3, text: 'Write Tests', status: 'active' },
      ];

      jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
        todos: mockTodos,
        dispatch: jest.fn(),
      });

      render(
        <TodosProvider>
          <TodoList filter='active' />
        </TodosProvider>
      );

      const input = screen.getByPlaceholderText('검색...');
      fireEvent.change(input, { target: { value: 'Write' } });

      // 'active' 상태이면서 검색어 'Write'가 포함된 todo만 보여야 함
      expect(screen.getByText('Write Tests')).toBeInTheDocument();
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      expect(screen.queryByText('Learn Testing')).not.toBeInTheDocument();
    });
  });
  it('displays message when no todos are available', () => {
    jest.spyOn(require('context/TodosContext'), 'useTodos').mockReturnValue({
      todos: [],
      dispatch: jest.fn(),
    });

    render(
      <TodosProvider>
        <TodoList filter='all' />
      </TodosProvider>
    );

    expect(screen.getByPlaceholderText('오늘 할 일')).toBeInTheDocument();
  });
});
