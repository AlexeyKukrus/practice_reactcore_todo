import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

class Task extends React.Component {
  constructor(props) {
    super();
    this.label = props.todo.label;
    this.state = {
      labelState: this.label,
    };
  }

  onChangeLabel = (e) => {
    this.setState({ labelState: e.target.value });
  };

  onSubmit = (e) => {
    const { labelState } = this.state;
    const { onEdited, onDeleted } = this.props;
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      onDeleted();
    }
  };

  onKeyDownEsc = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        labelState: this.label,
      });
    }
  };

  render() {
    const { todo, onDeleted, onDone, onToggleEdit } = this.props;
    const { id, label, done, date, edit } = todo;
    const { labelState } = this.state;

    const formElement = (
      <form onSubmit={this.onSubmit} onKeyDown={this.onKeyDownEsc} role="presentation">
        <input onChange={this.onChangeLabel} type="text" className="edit" value={labelState} />
      </form>
    );
    return (
      <div>
        <div className="view">
          <input type="checkbox" checked={done} className="toggle" onChange={onDone} />
          <label htmlFor={id}>
            <span className="description" onClick={onDone} role="presentation">
              {label}
            </span>
            <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
          </label>
          <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEdit} />
          <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {edit ? formElement : null}
      </div>
    );
  }
}

export default Task;
