import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  onInputChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdded } = this.props;
    const { label } = this.state;
    e.preventDefault();
    if (label.trim()) onAdded(label);
    else alert('You didn`t finish the task');
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input placeholder="What needs to be done?" className="new-todo" onChange={this.onInputChange} value={label} />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};

export default NewTaskForm;
