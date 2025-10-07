/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getUserTodo } from './service/todo';
import { Todo } from './types/Todo';
import { getUsers } from './service/user';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaderState, setLoaderState] = useState(false);
  const [selectTodos, setSelectTodos] = useState<number>();
  const [todosVisinle, setTodosVisible] = useState(todos);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaderState(true);

        const [todosData, usersData] = await Promise.all([
          getUserTodo(),
          getUsers(),
        ]);

        const todosWithUsers = todosData.map(todo => ({
          ...todo,
          user: usersData.find(user => user.id === todo.userId) || null,
        }));

        setTodos(todosWithUsers);
        setTodosVisible(todosWithUsers);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Помилка при завантаженні даних:', error);
      } finally {
        setLoaderState(false);
      }
    };

    fetchData();
  }, []);

  const filteredTodos = (value?: string, completed?: string) => {
    let newTodos = [...todos];

    if (value) {
      newTodos = newTodos.filter(todo =>
        todo.title.toLowerCase().includes(value.toLowerCase()),
      );
    }

    if (completed && completed !== 'all') {
      const status = completed === 'active' ? false : true;

      newTodos = newTodos.filter(todo => todo.completed === status);
    }

    setTodosVisible(newTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filteredTodos} />
            </div>

            <div className="block">
              {loaderState && <Loader />}
              <TodoList
                todos={todosVisinle}
                selectTodo={selectTodos}
                select={setSelectTodos}
              />
            </div>
          </div>
        </div>
      </div>
      {selectTodos && (
        <TodoModal
          select={selectTodos}
          todoList={todosVisinle}
          onClose={() => setSelectTodos(undefined)}
        />
      )}
    </>
  );
};
