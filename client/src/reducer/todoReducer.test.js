import { todoReducer } from './todoReducer';

describe('todoReducer', () => {
  it('should return initial state when no action is passed', () => {
    const initialState = [];
    expect(() => {
      todoReducer(initialState, { type: 'UNKNOWN_ACTION' });
    }).toThrow('Action UNKNOWN_ACTION');
  });

  it('should handle ADD action', () => {
    const initialState = [];
    const newTodo = { id: 1, text: 'Learn Testing', status: 'active' };
    const result = todoReducer(initialState, {
      type: 'ADD',
      todo: newTodo,
    });
    expect(result).toEqual([newTodo]);
  });

  describe('UPDATE', () => {
    it('should handle UPDATE action', () => {
      const initialState = [{ id: '1', text: 'Learn Test', status: 'active' }];
      const updateState = { id: '1', text: 'Learn Test', status: 'competed' };

      const result = todoReducer(initialState, {
        type: 'UPDATE',
        updated: updateState,
      });
      expect(result).toEqual([updateState]);
    });

    it('should return the same state if no item matches in UPDATE action', () => {
      const initialState = [{ id: 1, text: 'Learn Test', status: 'active' }];
      const updatedState = { id: 2, text: 'Updated Test', status: 'completed' };

      const result = todoReducer(initialState, {
        type: 'UPDATE',
        updated: updatedState,
      });

      expect(result).toEqual(initialState);
    });
  });

  describe('DELETE', () => {
    it('should handle DELETE action', () => {
      const initialState = [
        { id: 1, text: 'Learn Testing', status: 'pending' },
        { id: 2, text: 'Learn Reducers', status: 'pending' },
      ];
      const result = todoReducer(initialState, {
        type: 'DELETE',
        deleted: { id: 1 },
      });
      expect(result).toEqual([
        { id: 2, text: 'Learn Reducers', status: 'pending' },
      ]);
    });

    it('should return the same state if no item matches in DELETE action', () => {
      const initialState = [{ id: 1, text: 'Learn Test', status: 'active' }];
      const deletedState = { id: 2 };

      const result = todoReducer(initialState, {
        type: 'DELETE',
        deleted: deletedState,
      });

      expect(result).toEqual(initialState);
    });
  });
});
