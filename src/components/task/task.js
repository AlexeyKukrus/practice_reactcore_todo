import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer/timer';

import './task.css';

const Task = ({ onEdited, onDeleted, todo, onDone, onToggleEdit, timer }) => {
  const { id, label, done, date, edit } = todo;
  const [labelState, setLabelState] = useState(label);

  const onChangeLabel = (e) => {
    setLabelState(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      onDeleted();
    }
  };

  const onKeyDownEsc = (e) => {
    if (e.keyCode === 27) {
      setLabelState(label);
    }
  };

  const formElement = (
    <form onSubmit={onSubmit} onKeyDown={onKeyDownEsc} role="presentation">
      <input onChange={onChangeLabel} type="text" className="edit" value={labelState} />
    </form>
  );

  return (
    <div>
      <div className="view">
        <input type="checkbox" checked={done} className="toggle" onChange={onDone} />
        <label htmlFor={id}>
          <span className="description" onClick={onDone} role="presentation">
            {label}
          </span>
          <span className="created">
            <Timer initialTime={timer} done={done} />
          </span>
          <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
        </label>
        <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEdit} />
        <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {edit ? formElement : null}
    </div>
  );
};

export default Task;
