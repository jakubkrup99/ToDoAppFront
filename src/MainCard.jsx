import Input from "./Input";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import { v4  } from "uuid";


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
    })

    function handleDelete(index) {
        setTodos(todos.filter((todo) => {
           return todo.id !== index
        }) )
    }

    function handleInputChange(e) {
        e.target.preventDefautl
        setNewTodo(e.target.value);
    }

    function handleAddTodo() {
        if(newTodo != ""){
            setTodos((todos) => [...todos, {id: v4(), description: newTodo, isEditing: false}])
        }
        setNewTodo("");
    }

    function toggleCompletion(id){
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
    }

    function toggleEditing(id){
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo ))
    }

    function editTodo(value, id) {
        setTodos(todos.map((todo) => todo.id == id ? {...todo, description: value, isEditing: false} : todo))
    }


    
    

    return (
        <div className="min-h-6 text-center bg-secondary-color px-9 py-10 rounded-md w-3/4 max-w-5xl">
            <h1 className="text-white text-3xl font-semibold tracking-tight mb-5">Get Things Done!</h1>
            <Input newTodo={newTodo} handleInputChange={handleInputChange} handleAddTodo={handleAddTodo} buttonText="Add task"/>
            <ul>
            {todos.length > 0 && todos.map((todo) => <ListItem description={todo.description} key={todo.id} id={todo.id} handleDelete={handleDelete} isCompleted={todo.isCompleted} toggleCompletion={toggleCompletion} isEditing={todo.isEditing} toggleEditing={toggleEditing} editTodo={editTodo}/>)}
            </ul>
           
        </div>);
}

export default MainCard;