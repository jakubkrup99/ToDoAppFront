import Input from "./Input";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function MainCard() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect( () => {
        async function fetchData() {
            
            const fetched = await fetch('http://localhost:8000/tasks');
            let data = await fetched.json();
            data = data.map((task) => ({...task, id:Number(task.id), isEditing: false}))
            setTodos(data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        console.log(todos);
    },[todos])

    function handleDelete(index) {
        setTodos(todos.filter((_ , i) => {
           return i !== index
        }) )
    }

    function handleInputChange(e) {
        e.target.preventDefautl
        setNewTodo(e.target.value);
    }

    function handleAddTodo() {
        if(newTodo != ""){
            setTodos((todos) => [...todos, {id: todos.length+1, description: newTodo, author:'siema'}])
        }
        setNewTodo("");
        
    }

    function toggleCompletion(id){
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
    }
    

    return (
        <div className="min-h-6 text-center bg-secondary-color px-9 py-10 rounded-md w-3/4 max-w-5xl">
            <h1 className="text-white text-3xl font-semibold tracking-tight mb-5">Get Things Done!</h1>
            <Input newTodo={newTodo} handleInputChange={handleInputChange} handleAddTodo={handleAddTodo}/>
            <ul>
            {todos.length > 0 && todos.map((todo, i) => <ListItem description={todo.description} key={i} id={i} handleDelete={handleDelete} isCompleted={todo.isCompleted} toggleCompletion={toggleCompletion}/>)}
            </ul>
           
        </div>);
}

export default MainCard;