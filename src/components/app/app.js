import React, { useState } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

const App = () => {
  const [inputData, setInputData] = useState([]);
  const [filter, setFilter] = useState('all');

  const getId = () => {
    const date = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const newId = parseInt(`${date}${random}`);
    return newId;
  };

  const deleteItem = (id) => {
    const newArray = inputData.filter((item) => item.id !== id);
    setInputData(newArray);
  };

  const doneItem = (id) => {
    const updateInputData = inputData.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setInputData(updateInputData);
  };

  const addItem = (text, min, sec) => {
    const newItem = {
      // eslint-disable-next-line no-plusplus
      id: getId(),
      label: text,
      done: false,
      date: new Date(),
      edit: false,
      timer: +min * 60 + +sec,
    };
    setInputData((prevData) => [...prevData, newItem]);
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const clearCompleted = () => {
    const filterInputData = inputData.filter((item) => !item.done);
    setInputData(filterInputData);
  };

  const onToggleEdit = (id) => {
    const updateInputData = inputData.map((item) => {
      if (item.id === id) {
        return { ...item, edit: !item.edit };
      }
      return item;
    });
    setInputData(updateInputData);
  };

  const editItem = (id, label) => {
    const updateInputData = inputData.map((item) => {
      if (item.id === id) {
        return { ...item, label, edit: !item.edit };
      }
      return item;
    });
    setInputData(updateInputData);
  };

  const filteredTasks = () => {
    return inputData.filter((item) => {
      if (filter === 'all') {
        return true;
      }
      if (filter === 'completed') {
        return item.done === true;
      }
      return item.done === false;
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          tasksNames={filteredTasks()}
          onDeleted={deleteItem}
          onDone={doneItem}
          onEdited={editItem}
          onToggleEdit={onToggleEdit}
        />
        <Footer
          active={filteredTasks(inputData, filter).length}
          onFilterChange={onFilterChange}
          clearComplete={clearCompleted}
          filter={filter}
        />
      </section>
    </div>
  );
};

export default App;
