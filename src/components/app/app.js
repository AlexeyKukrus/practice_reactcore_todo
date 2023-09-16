import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer'

import './app.css'

const App = () => {
	const inputData = [
		{ label: 'Complete Task', id: 1 },
		{ label: 'Editing Task', id: 2 },
		{ label: 'Active Task', id: 3 }
	]
	return (
		<div className="todoapp">
			<header className='header'>
				<h1>todos</h1>
				<NewTaskForm />
			</header>
			<section className='main'>
				<TaskList
					tasksNames={inputData}
				/>
				<Footer />
			</section>
		</div>
	);
};

export default App;