import * as React from 'react';
import { Button } from 'react-bootstrap';
import ExcelToJson from '../Excel'

export default function AjoutLot() {
    
    const [chemin,setChemin]=React.useState('')
    const[extension,setextension]=React.useState('')
   const handleSubmit=(event)=> {
       setextension('.xlsx');
        event.preventDefault();
        const ExcelReader={chemin,extension}
        console.log(ExcelReader)
        fetch("http://localhost:9090/Usine/addCompleteLot",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(ExcelReader)
        }).then(()=>{
            console.log(" new lot added")
            
           // window.location.assign('/AllLot');
        })
        
      }

    
  return (
    
<div class="container">
  <form onSubmit={handleSubmit}>
                    <ExcelToJson></ExcelToJson>
                    
    </form>
</div>
 
  );
}
