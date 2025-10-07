import { Todo } from '../types/Todo';
import { getData } from '../Utils/UtilsClient';

export function getUserTodo(userId?: number): Promise<Todo[]> {
  return getData<Todo[]>(`/todos.json`).then(posts => {
    if (userId !== undefined) {
      const posted = [...posts];

      return posted.filter(post => post.id === userId);
    }

    return posts;
  });
}
