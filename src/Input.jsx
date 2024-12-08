import { useState } from "react";

function Input({ setTodos }) {
    
    const [newTodo, setNewTodo] = useState("");
    
    function handleInputChange(e) {
        e.preventDefault();
        setNewTodo(e.target.value);
    }

    function handleAddTodo(e) {
        e.preventDefault();
        if(newTodo == ""){
            return;
        }



        const todoDto = {description: newTodo, isCompleted: false};
        fetch('https://localhost:5100/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(todoDto), 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
                console.log('Success:', data);
                setNewTodo("");
                setTodos((todos) => [...todos, {id: data.id, description: newTodo, isEditing: false}])


        })
        .catch(error => {
                console.error('Error:', error);
        });

    }
   
    return (

        <form onSubmit={handleAddTodo}  className="border-primary-color border mb-7">
            <input type="text" value={newTodo}  onChange={handleInputChange} placeholder="What is the task?" className="px-1 py-1 w-3/4  border-none outline-none bg-secondary-color text-white" />
            <button type="submit" className="bg-primary-color px-1 py-1 text-white w-1/4" >Add task</button>
        </form>
        
      );
}

export default Input;