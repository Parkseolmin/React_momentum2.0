export function todoReducer(todos, action) {
  const { todo, updated, deleted } = action;

  switch (action.type) {
    case 'ADD':
      return [...todos, todo];

    case 'UPDATE':
      return todos.map((t) => (t.id === updated.id ? updated : t));

    case 'DELETE':
      return todos.filter((t) => t.id !== deleted.id);

    default: {
      throw new Error(`Action ${action.type}`);
    }
  }
}
