import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';
class App extends React.Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      inputData: [],
      filter: 'all',
    };
  }

  searchIndex(arr, id) {
    return arr.findIndex((item) => item.id === id);
  }

  toggleProperty(arr, id, propName) {
    const idx = this.searchIndex(arr, id);
    const oldItem = arr[idx];
    return [...arr.slice(0, idx), { ...oldItem, [propName]: !oldItem[propName] }, ...arr.slice(idx + 1)];
  }

  deleteItem = (id) => {
    this.setState(({ inputData }) => {
      const idx = this.searchIndex(inputData, id);

      const before = inputData.slice(0, idx);
      const after = inputData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        inputData: newArray,
      };
    });
  };

  doneItem = (id) => {
    this.setState(({ inputData }) => {
      return {
        inputData: this.toggleProperty(inputData, id, 'done'),
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      date: new Date(),
      edit: false,
      id: this.maxId++,
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
    const filteredData = this.state.inputData.filter((item) => !item.done);
    this.setState({ inputData: filteredData });
  };

  onToggleEdit = (id) => {
    this.setState(({ inputData }) => {
      return {
        inputData: this.toggleProperty(inputData, id, 'edit'),
      };
    });
  };

  editItem = (id, label) => {
    this.setState(({ inputData }) => {
      const idx = this.searchIndex(inputData, id);
      const oldItem = inputData[idx];
      const newDate = [
        ...inputData.slice(0, idx),
        { ...oldItem, label: label, edit: !oldItem.edit },
        ...inputData.slice(idx + 1),
      ];
      return { inputData: newDate };
    });
  };

  render() {
    const counterDone = this.state.inputData.filter((el) => el.done).length;
    const counterActive = this.state.inputData.length - counterDone;
    const { inputData, filter } = this.state;

    let filteredTasks;
    if (filter === 'completed') {
      filteredTasks = inputData.filter((item) => item.done);
    } else if (filter === 'active') {
      filteredTasks = inputData.filter((item) => !item.done);
    } else {
      filteredTasks = inputData;
    }

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            tasksNames={filteredTasks}
            onDeleted={this.deleteItem}
            onDone={this.doneItem}
            onEdited={this.editItem}
            onToggleEdit={this.onToggleEdit}
          />
          <Footer
            active={counterActive}
            onFilterChange={this.onFilterChange}
            clearComplete={this.clearCompleted}
            filter={this.state.filter}
          />
        </section>
      </div>
    );
  }
}

export default App;
