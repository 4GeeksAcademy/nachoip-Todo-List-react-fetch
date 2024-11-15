import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {
	const [todo, setTodo] = useState("")
	const [todoList, setTodoList] = useState([])



	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && todo) {
			postTodo();
			setTodo("");
		}
	}

	const deleteTask = (indexToDelete) => {
		const filteredList = todoList.filter((_, index) => index !== indexToDelete);
		setTodoList(filteredList);
	}

	const getTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/nachoip')
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				setTodoList(data.todos)
				console.log(data)
			})

			.catch((error) => {
				return error
			})
	}

	const postTodo = () => {
		let newTask = {
			label: todo,
			is_done: false
		}
		fetch('https://playground.4geeks.com/todo/todos/nachoip', {
			method: 'POST',
			body: JSON.stringify(newTask),
			headers: {
				'Content-Type': 'application/json'
			}

		})
			.then((response) => {
				console.log(response)

				return response.json()
			})
			.then((data) => {
				console.log(data);
				getTodos();


			})
			.catch((error) => { return error })

	}

	const deleteTodo = (todoId) => {
		fetch('https://playground.4geeks.com/todo/todos/${todoId}', {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
		})

			.then((response) => {
			console.log(response)
			return response.json()
			})
			.then((data) => {
			console.log(data);
			getTodos();

			})
			.catch((error) => { return error })

}



	
useEffect(() => { getTodos(); }, []);



	return (
		<div className="container text-center">
			<h1>todos</h1>

			<input className="form-control form-control-lg" type="text"
				placeholder="No hay tareas, añadir tareas"
				name="todo" id="todo"
				value={todo}
				onChange={(e) => {
					setTodo(e.target.value);

				}}

				onKeyDown={handleKeyDown}
			/>
			<h1>La tarea es: {todo} </h1>

			<ul className="list-group mt-3">
				{todoList.map((task, index) => (
					<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
					{task.label}
					<button className="btn-close" onClick={() => deleteTask(index)}></button>
				</li>
				))}
			</ul>

		</div>
	);
};

export default Home;
