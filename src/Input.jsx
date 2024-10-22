// import { useEffect } from "react";

function Input( {newTodo, handleInputChange, handleAddTodo} ) {

   

    return (
        <>
        <form className="border-primary-color border flex items-center mb-7">
            <input type="text" value={newTodo}  onChange={handleInputChange} placeholder="What is the task?" className="px-1 py-1 w-3/4  border-none outline-none bg-secondary-color text-white" />
            <button type="button" className="bg-primary-color px-1 py-1 text-white w-1/4" onClick={handleAddTodo}>Add Task</button>
        </form>
        </>
      );
}

export default Input;