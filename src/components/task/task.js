import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

class Task extends React.Component {
  state = {
    label: this.props.label,
  };

  onChangeLabel = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label !== '') {
      this.props.onEdited(this.state.label);
    } else {
      this.props.onDeleted();
    }
  };

  render() {
    const { label, done, date, edit, onDeleted, onDone, onToggleEdit } = this.props;
    const formElement = (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.onChangeLabel} type="text" className="edit" value={this.state.label} autoFocus />
      </form>
    );
    return (
      <div>
        <div className="view">
          <input type="checkbox" checked={done} className="toggle" onChange={onDone}></input>
          <label>
            <span className="description" onClick={onDone}>
              {label}
            </span>
            <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {edit ? formElement : null}
      </div>
    );
  }
}

export default Task;
