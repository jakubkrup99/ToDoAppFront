import { useState } from "react";

function Test() {

    const [name, setName] = useState();

    function handleNameChange(e){
        setName(e.target.value)
    }



    return (<>
     <input type="text" value={name} onChange={handleNameChange} />
     <p>Name: {name}</p>
     </>);
}

export default Test;