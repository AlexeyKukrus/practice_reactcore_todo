import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

function TaskList({ tasksNames, onDone, onDeleted, onEdited, onToggleEdit }) {
  const elements = tasksNames.map((item) => {
    const { id } = item;
    let classNames = null;
    if (item.done) {
      classNames = 'completed';
    }
    if (item.edit) {
      classNames = 'editing';
    }
    return (
      <li key={id} className={classNames}>
        <Task
          todo={item}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)}
          onEdited={(label) => onEdited(id, label)}
          onToggleEdit={() => onToggleEdit(id)}
          timer={item.timer}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onDone: () => {},
  onDeleted: () => {},
  onEdited: () => {},
  onToggleEdit: () => {},
};

TaskList.propTypes = {
  onDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  onToggleEdit: PropTypes.func,
};

export default TaskList;
