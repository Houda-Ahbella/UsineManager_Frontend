import {  Button } from "react-bootstrap"
import { useState} from 'react';


const EditEtape = ({etape,id}) =>{
    const [ordre,setordre]=useState(etape.ordre)
    const [des,setdes]=useState(etape.step.des)
    const ModifieEtape=async()=>
    { 
        if(etape.ordre !=ordre|| etape.step.des!=des)
        {
          if(etape.ordre !=ordre){ etape.ordre=ordre; }
          if(etape.step.des!=des) {etape.step.des=des; }
          const res= await fetch("http://localhost:9090/Usine/updateStepOfMarque",{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(etape)
          });
          const meorga = await res.json();
          if(meorga.ordre===-1)
           {
                  alert("cette ordre déjà existe")
            }
          else
          {
            if(meorga.ordre===-2)
            {
              alert("il y a déjà une etape dans cette ordre")
            }
            
            else
            {
              window.location.assign('/etapes?n='+etape.marque.num_marque+'&m='+etape.marque.designation+'&id='+id)
            }
      
      
          }
              
        }
        else
        {
          alert("vous avez rien changé")
        }
        
    }

    
    

  
     return (

        <form action="">
        <div class="form-group">
        <label>Ordre : </label><br></br>
                          <input type="number" class="form-control" onChange={(e)=>{setordre(e.target.value)}}
                          value={ordre} min="1"
                          ></input>
        <label>Designation : </label><br></br>
                          <input type="text" class="form-control" onChange={(e)=>{setdes(e.target.value)}}
                          value={des}
                          ></input>
                <Button variant="primary" onClick={ModifieEtape}>Modifier</Button>

        </div>
      </form>

     )
}

export default EditEtape;