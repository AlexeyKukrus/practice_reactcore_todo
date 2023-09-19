import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css'

class NewTaskForm extends React.Component {
  static defaultProps = {
		onAdded: () => { },
	}
  
  static propTypes = {
		onAdded: PropTypes.func,
  }
  
  state = {
    label: ''
  };

  onInputChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label)
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder='What needs to be done?'
          className='new-todo'
          onChange={this.onInputChange}
          value={this.state.label}>
          </input>
      </form>
    );
  } 
};

export default NewTaskForm;