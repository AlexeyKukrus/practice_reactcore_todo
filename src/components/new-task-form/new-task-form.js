import React from 'react';

import './new-task-form.css'

const NewTaskForm = () => {
  return (
    <input placeholder='What needs to be done?' className='new-todo' autoFocus></input>
  );
};

export default NewTaskForm;