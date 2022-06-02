import * as React from 'react';
import { Button ,Modal} from 'react-bootstrap';
export default function AjoutMarque() {
    const [designation,setDesignation]=React.useState('')
    const [url,setUrl]=React.useState('')
    const [existe,setexiste] = React.useState(false)
    const [require,setrequire] = React.useState(false)
    const handlerClick= async(e)=>
    {
        e.preventDefault()
        
      if(designation==='')
      { 
        setrequire(true)
        setTimeout(()=> {  setrequire(false) }, 3000)
      }
      else
      {
        const marque={designation,url}
        const response = await fetch("http://localhost:9090/Usine/addmarque",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(marque)
        });
        const body = await response.json();
       if(body.num_marque==0) 
       {
          setexiste(true)
          setTimeout(()=> {  setexiste(false) }, 3000)
       }
       else
       {
         window.location.assign('/allmarques');
       }
      }

    }
  return (
    
<div class="container">
  <form action="">
    <div class="form-group">
      <input type="text" class="form-control" id="designation" placeholder="Designation"
       name="Designation" 
       value={designation} 
      onChange={(e)=>setDesignation(e.target.value)}
       ></input>
      <input type="text" class="form-control" id="url vers l'image" placeholder="url" name="url"
      value={url}
      onChange={(e)=>setUrl(e.target.value)}
      ></input>
    </div>
    <Button  variant="primary" onClick={handlerClick}>Enregistrer</Button>
  </form>
  <Modal show={existe}>
                <Modal.Title class="alert alert-danger" role="alert">
                  La marque {designation} déjà existe
                </Modal.Title>         
  </Modal>
  <Modal show={require}>
                <Modal.Title class="alert alert-danger" role="alert">
                 vérifiez vous informations
                </Modal.Title>         
  </Modal>
</div>
 
  );
}
