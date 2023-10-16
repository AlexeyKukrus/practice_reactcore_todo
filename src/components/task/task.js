import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.timer = props.todo.timerId;
    this.timeout = null;
    this.label = props.todo.label;
    this.state = {
      labelState: this.label,
      finalDelete: false,
      pause: Boolean(!this.timer),
      play: Boolean(this.timer),
    };
  }

  componentWillUnmount() {
    const { finalDelete } = this.state;
    if (finalDelete) {
      clearInterval(this.timer);
      clearTimeout(this.timeout);
    }
  }

  onChangeLabel = (e) => {
    this.setState({ labelState: e.target.value });
  };

  handleDeleteItem = () => {
    const { onDeleted } = this.props;
    this.setState({ finalDelete: true });
    this.timeout = setTimeout(() => onDeleted(), 100);
  };

  onSubmit = (e) => {
    const { labelState } = this.state;
    const { onEdited } = this.props;
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      this.handleDeleteItem();
    }
  };
  onKeyDownEsc = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        labelState: this.label,
      });
    }
  };

  counter = undefined;

  startTimer = () => {
    const { onUploadTimer, onEditTimerId } = this.props;
    this.timer = setInterval(() => {
      onUploadTimer();
    }, 1000);
    onEditTimerId(this.timer);
    this.setState({ pause: false, play: true });
  };

  pauseTimer = () => {
    const { onEditTimerId } = this.props;
    onEditTimerId(0);
    clearInterval(this.timer);
    this.setState({ pause: true, play: false });
  };

  render() {
    const { todo, onDone, onToggleEdit } = this.props;
    const { id, label, done, date, edit, min, sec } = todo;
    const { labelState, play, pause } = this.state;

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
            <span className="created">
              <button
                type="button"
                className="icon icon-play"
                onClick={this.startTimer}
                disabled={play}
                aria-label="play"
              />
              <button
                type="button"
                className="icon icon-pause"
                onClick={this.pauseTimer}
                disabled={pause}
                aria-label="pause"
              />
              {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
            </span>
            <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
          </label>
          <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEdit} />
          <button aria-label="delete" type="button" className="icon icon-destroy" onClick={this.handleDeleteItem} />
        </div>
        {edit ? formElement : null}
      </div>
    );
  }
}

export default Task;
