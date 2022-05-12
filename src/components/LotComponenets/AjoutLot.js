import * as React from 'react';
import { Button } from 'react-bootstrap';

export default function AjoutLot() {
    
    const [chemin,setChemin]=React.useState('')
   const handleSubmit=(event)=> {
        event.preventDefault();
        const ExcelReader={chemin}
        console.log(ExcelReader)
        fetch("http://localhost:9090/Usine/addCompleteLot",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(ExcelReader)
        }).then(()=>{
            console.log(" new lot added")
            
            //window.location.assign('http://localhost:3000/AllLot');
        })
        
      }

    
  return (
    
<div class="container">
  <form onSubmit={handleSubmit}>
                    Chemin du fichier :
                    <input type="text" value={chemin}
                    onChange={(e)=>setChemin(e.target.value)} class="form-control"></input>
                    <br />
                    <Button variant= "primary" type="submit">Envoyer</Button>
    </form>
</div>
 
  );
}
