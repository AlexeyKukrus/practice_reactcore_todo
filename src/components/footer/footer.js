import React from 'react';

import TasksFilter from '../task-filter/task-filter'

import './footer.css'
const Footer = ({active, onFilterChange, clearComplete}) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>{active} items left</span>
      <TasksFilter onFilterChange={onFilterChange}/>
      <button className='clear-completed' onClick={clearComplete}>Clear completed</button>
    </footer>
  );
};

export default Footer;