import React, { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = ({ onAdded }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (label.trim()) {
        onAdded(label, min, sec);
        setLabel('');
        setMin('');
        setSec('');
      } else {
        alert('You didn`t finish the task');
      }
    }
  };

  return (
    <form className="new-todo-form" onKeyUp={onSubmit} role="presentation">
      <input
        placeholder="What needs to be done?"
        className="new-todo"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
      />
      <input
        placeholder="Min"
        className="new-todo-form__timer"
        onChange={(e) => setMin(e.target.value)}
        value={min}
        min={0}
        type="number"
      />
      <input
        placeholder="Sec"
        className="new-todo-form__timer"
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        min={0}
        type="number"
      />
    </form>
  );
};

export default NewTaskForm;
