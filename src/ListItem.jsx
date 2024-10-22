import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


function ListItem( {description, id, handleDelete} ) {
    return (
        <li key={id} className="text-white flex justify-between bg-primary-color p-2 rounded-lg mb-4">
            <p  className="mr-2">
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