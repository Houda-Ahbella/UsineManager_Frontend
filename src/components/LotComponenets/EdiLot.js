import {  Button , DatePicker } from "react-bootstrap"
import { useState} from 'react';


const EditLot = ({theLot}) =>{
    const [num_bach, setnum_bach] = useState(theLot.num_bach);
    const [connaissement, setconnaissement] = useState(theLot.connaissement);
    const [date_Entree, setdate_Entree] = useState(theLot.date_Entree);
    const handlerClick=(e)=>
    {  const nombre_vehicules = theLot.nombre_vehicules ;
        const num_lot = theLot.num_lot;
       const modeleLot = theLot.modeleLot;
    
        e.preventDefault()
        
        console.log(date_Entree)
        const lot={nombre_vehicules,num_lot,modeleLot,date_Entree,num_bach,connaissement}
        console.log(lot)
        fetch("http://localhost:9090/Usine/updatelot",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(lot)
        }).then(()=>{
            console.log(" lot updated")
            window.location.assign('http://localhost:3000/AllLot');
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