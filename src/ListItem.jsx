import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


function ListItem( {description, id, handleDelete, isCompleted, toggleCompletion} ) {
    return (
        
        <li key={id}  className={`flex justify-between bg-primary-color p-2 rounded-lg mb-4 text-white select-none`}>
            <p  className={`mr-2 ${!isCompleted ? 'text-white' : 'text-secondary-color line-through' }`} onClick={() => toggleCompletion(id)}>
                {description}
            </p>
            <div className="flex items-center justify-between">
                <FaEdit className="mr-2" />
                <button onClick={() => handleDelete(id)}>
                    <FaRegTrashAlt />
                </button>
                
            </div>
        </li>
    );
}


export default ListItem;