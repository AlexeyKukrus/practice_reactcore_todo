import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer'

import './app.css'
class App extends React.Component{
	constructor() {
		super();
		this.state = {
			inputData:[
				{ label: 'Complete Task', done: false, id: 1 },
				{ label: 'Editing Task', done: false, id: 2 },
				{ label: 'Active Task', done: false, id: 3 }
			]
		}
	}
	
	deleteItem = (id) => {
		this.setState(({ inputData }) => {
			
			const idx = inputData.findIndex((el) => el.id === id);
			const before = inputData.slice(0, idx);
			const after = inputData.slice(idx + 1);
			const newArray = [...before, ...after];

			
			return {
				inputData: newArray
			};
		});
	};
	
	doneItem = (id) => {
		this.setState(({ inputData }) => {

			const idx = inputData.findIndex((el) => el.id === id);
			const oldItem = inputData[idx];
			const newItem = { ...oldItem, done: !oldItem.done }
			
			const before = inputData.slice(0, idx);
			const after = inputData.slice(idx + 1);
			const newArray = [...before, newItem, ...after];

			return {
				inputData: newArray
			};
		});
	};

	render() {
		return (
			<div className="todoapp">
				<header className='header'>
					<h1>todos</h1>
					<NewTaskForm />
				</header>
				<section className='main'>
					<TaskList
						tasksNames={this.state.inputData}
						onDeleted={this.deleteItem}
						onDone={this.doneItem}
					/>
					<Footer />
				</section>
				
			</div>
		);
	}
};
export default App;