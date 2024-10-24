import Input from "./Input";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";

function MainCard() {

    const [todos, setTodos] = useState([]);

    useEffect( () => {
        async function fetchData() {
            
            const fetched = await fetch('http://localhost:5100/todos');
            let data = await fetched.json();
            data = data.map((task) => ({...task, id:Number(task.id), isEditing: false}))
            setTodos(data);
        }
        fetchData();
    }, [])



    return (

        <div className="text-center bg-secondary-color px-9 py-10 rounded-md w-3/4 max-w-5xl mt-20">
            <h1 className="text-white text-3xl font-semibold tracking-tight mb-5">Get Things Done!</h1>
            <Input todos={todos} setTodos={setTodos} buttonText="Add task"/>
            <ul>
            {todos.length > 0 && todos.map((todo) => <ListItem todo={todo} key={todo.id}  setTodos={setTodos}/>)}
            </ul>
           
        </div>
        
    );
}

export default MainCard;