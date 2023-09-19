import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task'

import './task-list.css'

const TaskList = ({tasksNames, onDone, onDeleted, onEdited, onToggleEdit}) => {
  const elements = tasksNames.map((item) => {
    const { id, ...itemProps } = item
    let classNames = null 
    if (item.done) {
      classNames = 'completed'
    }
    if (item.edit) {
      classNames = 'editing'
    }
    return (
      <li key={id} className={classNames}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)}
          onEdited={(label) => onEdited(id, label)}
          onToggleEdit={() => onToggleEdit(id)}
        />
      </li>
    );    
  });

  return (
    <ul className='todo-list'>
      {elements}
    </ul>
  );
};

TaskList.defaultProps = {
  tasksNames: [],
  onDone: () => {},
	onDeleted: () => { },
	onEdited: () => { },
	onToggleEdit: () => { }
}

TaskList.propTypes = {
  tasksNames: PropTypes.arrayOf(PropTypes.object),
	onDone: PropTypes.func,
	onDeleted: PropTypes.func,
	onEdited: PropTypes.func,
	onToggleEdit: PropTypes.func
}

export default TaskList;