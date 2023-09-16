import React from 'react';

import './task.css'

class Task extends React.Component {
	
	render() {
		const { label } = this.props;
	
		return (
			<div className='view'>
				<input type='checkbox' className='toggle'></input>
				<label>
					<span className='description'>{label}</span>
				</label>
				<button className='icon icon-edit'></button>
				<button className='icon icon-destroy'></button>
			</div>
		);
	}
};

export default Task;
