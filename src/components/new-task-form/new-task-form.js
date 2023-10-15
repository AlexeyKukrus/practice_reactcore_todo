import React from 'react';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onSubmit = (e) => {
    const { onAdded } = this.props;
    const { label, min, sec } = this.state;
    e.preventDefault();
    if (e.keyCode === 13) {
      if (label.trim()) {
        onAdded(label, min, sec);
        this.setState({
          label: '',
          min: '',
          sec: '',
        });
        console.log(this.state);
      } else {
        alert('You didn`t finish the task');
      }
    }
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form className="new-todo-form" onKeyUp={this.onSubmit} role="presentation">
        <input
          placeholder="What needs to be done?"
          className="new-todo"
          onChange={(e) => this.setState({ label: e.target.value })}
          value={label}
        />
        <input
          placeholder="Min"
          className="new-todo-form__timer"
          onChange={(e) => this.setState({ min: e.target.value })}
          value={min}
          min={0}
          type="number"
        />
        <input
          placeholder="Sec"
          className="new-todo-form__timer"
          onChange={(e) => this.setState({ sec: e.target.value })}
          value={sec}
          min={0}
          type="number"
        />
      </form>
    );
  }
}

export default NewTaskForm;
