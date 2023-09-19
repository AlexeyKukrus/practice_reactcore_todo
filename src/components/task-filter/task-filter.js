import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css'

class TasksFilter extends React.Component {
  static defaultProps = {
		filter: 'all',
  }

  static propTypes = {
		filter: PropTypes.string
  }
  
  render() {
    const {filter, onFilterChange } = this.props;
    
    return (
      <ul className='filters'>
        <li>
          <button onClick={() => onFilterChange('all')}
            className={filter === "all" ? 'selected' : null}>All</button></li>
        <li>
          <button onClick={() => onFilterChange('active')}
            className={filter === "active" ? 'selected' : null}>Active</button></li>
        <li>
          <button onClick={() => onFilterChange('completed')}
            className={filter === "completed" ? 'selected' : null}>Completed</button></li>
      </ul>
    );
	};
};

export default TasksFilter;