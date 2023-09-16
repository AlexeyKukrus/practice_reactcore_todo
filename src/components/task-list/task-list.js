import React from 'react';

import Task from '../task/task'

import './task-list.css'

const TaskList = ({ tasksNames}) => {
  
  const elements = tasksNames.map((item) => {
    const {id, ...itemProps} = item
    return (
      <li key={id}><Task {...itemProps} /></li>
    );    
  });

  return (
    <ul className='todo-list'>
      {elements}
    </ul>
  );
};

export default TaskList;
