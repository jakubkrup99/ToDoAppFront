import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import EditTodoForm from "./EditTodoForm";
//TODO: Stop refreshing page when i press enter


function ListItem({ todo, setTodos }) {

    const {isCompleted, id, isEditing, description} = todo;

    function toggleEditing(id){
        setTodos((todos) => {
            return todos.map((todo) => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo );
        })
    }

    function handleDelete(index) {
        setTodos((todos) => {
            return todos.filter((todo) => todo.id !== index);
        })

        fetch(`https://localhost:5100/todos/${index}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    async function toggleCompletion(id) {
        let isCompleted
        await setTodos((todos) => {
            return todos.map((todo) => {
                if(todo.id === id){
                    isCompleted = !todo.isCompleted;
                    console.log('jestem here', todo.isCompleted);

                    return {...todo, isCompleted}
                }
                return todo;
            })
        })
        console.log('now im here', isCompleted);
        const patchDto = [{"path": "/iscompleted", "op": "replace", "value": isCompleted}];

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

    

    return isEditing ? <EditTodoForm id={id} initialValue={description} setTodos={setTodos}/> : (
        
        <div>
        <li  key={id} className={`flex justify-between bg-primary-color p-2 rounded-lg mb-4 text-white select-none`}>
            <p  className={`mr-2 break-all	 ${!isCompleted ? 'text-white' : 'text-secondary-color line-through' }`} onClick={() => toggleCompletion(id)}>
                {description}
            </p>
            <div className="flex items-center justify-between">
                <FaEdit className="mr-2 cursor-pointer" onClick={() => toggleEditing(id)} />
                <button onClick={() => handleDelete(id)}>
                    <FaRegTrashAlt />
                </button>
                
            </div>
        </li>
        </div>
    );
}

export default ListItem;