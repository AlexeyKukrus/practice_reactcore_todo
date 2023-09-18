import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer'

import './app.css'
class App extends React.Component{
	constructor() {
		super();
		this.maxId = 100;
		this.state = {
			inputData: [],
			filter: ''
		};
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

	addItem = (text) => {
		const newItem = {
			label: text,
			done: false,
			id: this.maxId++
		}
		this.setState(({inputData}) => {
			const newArray = [...inputData, newItem]
			return {
				inputData: newArray
			}
		})
		
	}

	onFilterChange = (filter) => {
		this.setState({ filter });
	}

	clearCompleted = () => {
		const filteredData = this.state.inputData.filter(item => !item.done);
		this.setState({ inputData: filteredData });
	}

	render() {
		const counterDone = this.state.inputData.filter((el) => el.done).length;
		const counterActive = this.state.inputData.length - counterDone;
		const { inputData, filter } = this.state;
		
		let filteredTasks;
		if (filter === 'completed') {
			filteredTasks = inputData.filter(item => item.done);
		} else if (filter === 'active') {
			filteredTasks = inputData.filter(item => !item.done);
		} else {
			filteredTasks = inputData;
		}

		return (
			<div className="todoapp">
				<header className='header'>
					<h1>todos</h1>
					<NewTaskForm onAdded={this.addItem} />
				</header>
				<section className='main'>
					<TaskList
						tasksNames={filteredTasks}
						onDeleted={this.deleteItem}
						onDone={this.doneItem}
					/>
					<Footer
						active={counterActive} onFilterChange={this.onFilterChange} clearComplete={this.clearCompleted}/>
				</section>
				
			</div>
		);
	}
};

export default App;