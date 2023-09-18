import React from 'react';

import './task-filter.css'

class TasksFilter extends React.Component {
  render() {
    const { onFilterChange } = this.props;
    
    return (
      <ul className='filters'>
        <li><button className='selected' onClick={() => onFilterChange('all')}>All</button></li>
        <li><button onClick={() => onFilterChange('active')}>Active</button></li>
        <li><button onClick={() => onFilterChange('completed')}>Completed</button></li>
      </ul>
    );
	};
};

export default TasksFilter;