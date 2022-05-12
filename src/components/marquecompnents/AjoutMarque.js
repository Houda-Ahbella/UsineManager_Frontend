import * as React from 'react';
import { Button } from 'react-bootstrap';
export default function AjoutMarque() {
    const [designation,setDesignation]=React.useState('')
    const [url,setUrl]=React.useState('')
    const handlerClick=(e)=>
    {
        e.preventDefault()
        const marque={designation,url}
        console.log(marque)
        fetch("http://localhost:9090/Usine/addmarque",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(marque)
        }).then(()=>{
            console.log(" new marque added")
            window.location.assign('http://localhost:3000/allmarques');
        })
       

    }
  return (
    
<div class="container">
  <form action="">
    <div class="form-group">
      <input type="text" class="form-control" id="designation" placeholder="Designation" name="Designation"
      value={designation}
      onChange={(e)=>setDesignation(e.target.value)}
      ></input>
      <input type="text" class="form-control" id="url vers l'image" placeholder="url" name="url"
      value={url}
      onChange={(e)=>setUrl(e.target.value)}
      ></input>
    </div>
    <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
  </form>
</div>
 
  );
}
