import {  Button  } from "react-bootstrap"
import { useState} from 'react';


const EditLot = ({theLot,id}) =>{
    const [num_bach, setnum_bach] = useState(theLot.num_bach);
    const [connaissement, setconnaissement] = useState(theLot.connaissement);
    const [date_Entree, setdate_Entree] = useState(theLot.date_Entree);
    const handlerClick=(e)=>
    {   e.preventDefault()
        
        
       theLot.connaissement=connaissement
       theLot.num_bach = num_bach
       theLot.date_Entree = date_Entree
        fetch("http://localhost:9090/Usine/updatelot",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(theLot)
        }).then(()=>{
            console.log(" lot updated")
            window.location.assign('http://localhost:3000/AllLot?m='+id);
        }
        )
        
        
        
    }

    
    

  
     return (

        <form action="">
        <div class="form-group">
          <input type="text" class="form-control" id="designation" placeholder="num Bach" name="Num"
          value={num_bach}
          onChange={(e)=>setnum_bach(e.target.value)}
          ></input>
          <input type="text" class="form-control" id="url" placeholder="CONNAISSEMENT" name="url"
          value={connaissement}
          onChange={(e)=>setconnaissement(e.target.value)}
          ></input>
        <input type="date" value={date_Entree} onChange={(e)=>setdate_Entree(e.target.value)} ></input>
        </div>
        <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
      </form>

     )
}

export default EditLot;