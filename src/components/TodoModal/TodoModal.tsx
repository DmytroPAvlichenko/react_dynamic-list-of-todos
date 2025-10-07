import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  onClose: () => void;
  select: number;
  todoList: Todo[];
};

export const TodoModal: React.FC<Props> = React.memo(
  ({ onClose, select, todoList }) => {
    const [loaderState, setLoaderState] = useState(false);
    const [todo, setTodo] = useState<Todo>();

    useEffect(() => {
      setLoaderState(true);

      setTimeout(() => {
        setLoaderState(false);
        setTodo(todoList.find(todos => todos.id === select));
      }, 1000);
    }, [select]);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {loaderState ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => onClose()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`"mailto:${todo?.user?.email}"`}>{todo?.user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

TodoModal.displayName = 'TodoModal';
