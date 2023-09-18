import React from 'react';

import Task from '../task/task'

import './task-list.css'

const TaskList = ({tasksNames, onDone, onDeleted}) => {
  const elements = tasksNames.map((item) => {
    const { id, ...itemProps } = item
    let classNames = '' 
    if (item.done) {
      classNames += 'completed'
    }
    return (
      <li key={id} className={classNames}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)} />
      </li>
    );    
  });

  return (
    <ul className='todo-list'>
      {elements}
    </ul>
  );
};

export default TaskList;