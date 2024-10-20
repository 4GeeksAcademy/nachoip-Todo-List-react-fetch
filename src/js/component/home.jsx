import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todo, setTodo] = useState("")
	const [todoList, setTodoList] = useState([])
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && todo) {
			setTodoList([...todoList, todo]);
			setTodo("");
		}
	}
const deleteTask = (indexToDelete)=> {
	const filteredList = todoList.filter((_, index)=> index !== indexToDelete);
	setTodoList(filteredList);
}

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
				{todoList.map((task, index)=>(
				<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
					{task}
					<button  className="btn-close" onClick={()=> deleteTask(index)}></button>
				</li>	
				))}
			</ul>
			
		</div>
	);
};

export default Home;
