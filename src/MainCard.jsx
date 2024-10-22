import Input from "./Input";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";

function MainCard() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState();

    useEffect( () => {
        async function fetchData() {
            
            const fetched = await fetch('http://localhost:8000/tasks');
            const data = await fetched.json();
            setTodos(data);
        }
        fetchData();
    }, [])

    function handleDelete(index) {
        console.log('dziala');
        setTodos(todos.filter((_ , i) => i !== index) )
    }

    function handleInputChange(e) {
        setNewTodo(e.target.value);
    }

    function handleAddTodo() {
        console.log('handleaddtodo dziala');
        if(newTodo != ""){
            setTodos((todos) => [...todos, {id: String(todos.length+1), description: newTodo, author:'siema'}])
        }
        setNewTodo("");
        console.log(todos);
        
    }
    

    return (
        <div className="min-h-6 text-center bg-secondary-color px-10 py-10 rounded-md w-3/4 max-w-5xl">
            <h1 className="text-white text-3xl font-semibold tracking-tight mb-5">Get Things Done!</h1>
            <Input newTodo={newTodo} handleInputChange={handleInputChange} handleAddTodo={handleAddTodo}/>
            <ul>
            {todos.length > 0 && todos.map(todo => <ListItem description={todo.description} key={todo.id} handleDelete={handleDelete}/>)}
            </ul>
           
        </div>);
}

export default MainCard;