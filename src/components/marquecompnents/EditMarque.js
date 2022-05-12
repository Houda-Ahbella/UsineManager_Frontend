import {  Button } from "react-bootstrap"
import { useState} from 'react';


const EditForm = ({theMarque}) =>{
    const [designation, setDesignation] = useState(theMarque.designation);
    const [url, setUrl] = useState(theMarque.url);
    const handlerClick=(e)=>
    {
        e.preventDefault()
        const marque={designation,url}
        console.log(marque)
        fetch("http://localhost:9090/Usine/updateemarque",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(marque)
        }).then(()=>{
            console.log(" marque updated")
            window.location.assign('http://localhost:3000/allmarques');
        }
        )
        
       
    }

    
    

  
     return (

        <form action="">
        <div class="form-group">
          <label >Numéro de chassis:</label>
          <input type="text" class="form-control" id="designation" placeholder="Designation" name="Designation"
          value={designation}
          onChange={(e)=>setDesignation(e.target.value)} readOnly
          ></input>
          <label >URL vers l'image:</label>
          <input type="text" class="form-control" id="url" placeholder="url" name="url"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          ></input>
          
        </div>
        <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
      </form>

     )
}

export default EditForm;