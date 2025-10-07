import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUserTodo } from '../../service/todo';
import { User } from '../../types/User';
import { getUsers } from '../../service/user';

type Props = {
  onClose: () => void;
  select: number;
};

export const TodoModal: React.FC<Props> = React.memo(({ onClose, select }) => {
  const [loaderState, setLoaderState] = useState(false);
  const [todoInfo, setTodoInfo] = useState<Todo[] | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    setLoaderState(true);

    setTimeout(() => {
      setLoaderState(false);
      getUserTodo(select).then(setTodoInfo);
      getUsers(select).then(setUserInfo);
    }, 1000);
  }, [select]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaderState ? (
        <Loader />
      ) : (
        todoInfo?.map(todo => (
          <div className="modal-card" key={todo.id}>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo # {todo.id}
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
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`"mailto:${userInfo?.email}"`}>{userInfo?.name}</a>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
});

TodoModal.displayName = 'TodoModal';
