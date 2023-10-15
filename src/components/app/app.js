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
      min: min,
      sec: sec,
      done: false,
      date: new Date(),
      edit: false,
      timer: +min * 60 + +sec,
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
