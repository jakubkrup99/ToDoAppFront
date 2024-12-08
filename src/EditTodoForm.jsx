import { useState } from "react";

function EditTodoForm( {initialValue, id, setTodos} ) {

    const [value, setValue] = useState(initialValue);

    function handleValueChange(e) {
        setValue(e.target.value); 
    }

    function handleSubmit(e){
        e.preventDefault();
        editTodo(value, id);
    }

    function editTodo(value, id){
        setTodos((todos) => {
            return todos.map((todo) => todo.id == id ? {...todo, description: value, isEditing: false} : todo)
        })
        
        const patchDto = [{"path": "/description", "op": "replace", "value": value}];

        fetch(`http://localhost:5100/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json-patch+json'
            },
            body: JSON.stringify(patchDto), 
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
        
    }

    return (

         <form className="border-primary-color border flex items-center mb-7" onSubmit={handleSubmit}>
            <input type="text" value={value}  onChange={handleValueChange} placeholder="What is the task?" className="px-1 py-1 w-3/4  border-none outline-none bg-secondary-color text-white" />
            <button type="submit" className="bg-primary-color px-1 py-1 text-white w-1/4">Edit Task</button>
        </form>

     );
}

export default EditTodoForm;