import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

class App extends React.Component {
  maxId = 100;

  constructor() {
    super();
    this.state = {
      inputData: [],
      filter: 'all',
    };
  }

  deleteItem = (id) => {
    this.setState(({ inputData }) => {
      const newArray = inputData.filter((item) => item.id !== id);
      return {
        inputData: newArray,
      };
    });
  };

  doneItem = (id) => {
    this.setState(({ inputData }) => ({
      inputData: this.toggleProperty(inputData, id, 'done'),
    }));
  };

  addItem = (text, min, sec) => {
    const newItem = {
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      label: text,
      min: Number(min),
      sec: Number(sec),
      done: false,
      date: new Date(),
      edit: false,
      timerId: 0,
    };
    this.setState(({ inputData }) => {
      const newArray = [...inputData, newItem];
      return {
        inputData: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    const { inputData } = this.state;
    const filteredData = inputData.filter((item) => !item.done);
    this.setState({ inputData: filteredData });
  };

  onToggleEdit = (id) => {
    this.setState(({ inputData }) => ({
      inputData: this.toggleProperty(inputData, id, 'edit'),
    }));
  };

  editItem = (id, label) => {
    this.setState(({ inputData }) => {
      const idx = this.searchIndex(inputData, id);
      const oldItem = inputData[idx];
      const newDate = [
        ...inputData.slice(0, idx),
        { ...oldItem, label, edit: !oldItem.edit },
        ...inputData.slice(idx + 1),
      ];
      return { inputData: newDate };
    });
  };

  filteredTasks = () => {
    const { inputData, filter } = this.state;
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

  // eslint-disable-next-line class-methods-use-this
  searchIndex(arr, id) {
    return arr.findIndex((item) => item.id === id);
  }

  toggleProperty(arr, id, propName) {
    const idx = this.searchIndex(arr, id);
    const oldItem = arr[idx];
    return [...arr.slice(0, idx), { ...oldItem, [propName]: !oldItem[propName] }, ...arr.slice(idx + 1)];
  }

  uploadTimer = (id) => {
    this.setState(({ inputData }) => {
      const index = this.searchIndex(inputData, id);
      const oldItem = inputData[index];
      const { min, sec } = oldItem;
      let newSec = sec - 1;
      let newMin = min;
      if (newSec < 0) {
        if (newMin <= 0) {
          newSec = 0;
          newMin = 0;
        } else {
          newSec = 59;
          newMin = min - 1;
        }
      }
      const newArray = [
        ...inputData.slice(0, index),
        { ...oldItem, min: newMin, sec: newSec },
        ...inputData.slice(index + 1),
      ];
      return { inputData: newArray };
    });
  };

  editTimerId = (id, timerId) => {
    this.setState(({ inputData }) => {
      const index = this.searchIndex(inputData, id);
      const oldItem = inputData[index];
      const newDate = [...inputData.slice(0, index), { ...oldItem, timerId }, ...inputData.slice(index + 1)];
      return { inputData: newDate };
    });
  };
  render() {
    const { inputData, filter } = this.state;
    const counterDone = inputData.filter((el) => el.done).length;
    const counterActive = inputData.length - counterDone;

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            tasksNames={this.filteredTasks()}
            onDeleted={this.deleteItem}
            onDone={this.doneItem}
            onEdited={this.editItem}
            onToggleEdit={this.onToggleEdit}
            onUploadTimer={this.uploadTimer}
            onEditTimerId={this.editTimerId}
          />
          <Footer
            active={counterActive}
            onFilterChange={this.onFilterChange}
            clearComplete={this.clearCompleted}
            filter={filter}
          />
        </section>
      </div>
    );
  }
}

export default App;
