import { Todo } from '../types/Todo';
import { getData } from '../Utils/UtilsClient';

export function getUserTodo(todoId?: number): Promise<Todo[]> {
  return getData<Todo[]>(`/todos.json`).then(posts => {
    if (todoId !== undefined) {
      const posted = [...posts];

      return posted.filter(todo => todo.id === todoId);
    }

    return posts;
  });
}
