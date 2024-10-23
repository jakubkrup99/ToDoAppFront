import { v4  } from "uuid";

import { useState } from "react";

function Input({ setTodos }) {
    
    const [newTodo, setNewTodo] = useState("");
    
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
   
    return (

        <form className="border-primary-color border flex items-center mb-7">
            <input type="text" value={newTodo}  onChange={handleInputChange} placeholder="What is the task?" className="px-1 py-1 w-3/4  border-none outline-none bg-secondary-color text-white" />
            <button type="button" className="bg-primary-color px-1 py-1 text-white w-1/4" onClick={handleAddTodo}>Add task</button>
        </form>
        
      );
}

export default Input;