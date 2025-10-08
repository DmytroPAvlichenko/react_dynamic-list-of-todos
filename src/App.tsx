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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaderState, setLoaderState] = useState(true);
  const [selectTodos, setSelectTodos] = useState<Todo>();
  const [todosVisinle, setTodosVisible] = useState(todos);

  useEffect(() => {
    getUserTodo().then(data => {
      setTodos(data);
      setTodosVisible(data);
      setLoaderState(false);
    });
  }, []);

  const handleFilter = (value?: string, completed?: string) => {
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
              <TodoFilter filter={handleFilter} />
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
          onClose={() => setSelectTodos(undefined)}
        />
      )}
    </>
  );
};
