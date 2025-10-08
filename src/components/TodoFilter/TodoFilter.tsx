import React, { useEffect, useState } from 'react';
type Props = {
  filter: (value: string, completed: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({ filter }) => {
  const [qveryChange, setQveryChange] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [completedStatus, setCompletedStatus] = useState('');

  useEffect(() => {
    filter(qveryChange, completedStatus);
  }, [qveryChange, completedStatus]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setInputValue(newValue);
    setQveryChange(newValue.trim());
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setCompletedStatus(newValue);
  };

  const reset = () => {
    setInputValue('');
    setQveryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedStatus}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
});

TodoFilter.displayName = 'TodoFilter';
