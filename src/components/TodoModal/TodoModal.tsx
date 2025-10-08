import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUsers } from '../../service/user';
import { User } from '../../types/User';
import { getUserTodo } from '../../service/todo';

type Props = {
  onClose: () => void;
  select: Todo;
};

export const TodoModal: React.FC<Props> = React.memo(({ onClose, select }) => {
  const [loaderState, setLoaderState] = useState(false);
  const [user, setUser] = useState<User>();
  const [todo, setTodo] = useState<Todo[]>();

  useEffect(() => {
    setLoaderState(true);

    setTimeout(() => {
      setLoaderState(false);
      getUserTodo(select.id).then(setTodo);
      getUsers(select.userId).then(setUser);
    }, 1000);
  }, [select]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loaderState ? (
        <Loader />
      ) : (
        <div className="modal-card">
          {todo?.map(to => (
            <>
              <header key={to.id} className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{to.id}
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
                  {to.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {to.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
});

TodoModal.displayName = 'TodoModal';
