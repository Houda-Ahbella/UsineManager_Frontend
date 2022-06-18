import {  Button } from "react-bootstrap"
import { useState} from 'react';


const EditVehicule = ({theVehicule}) =>{
    const [numengine, setnum_Engine] = useState(theVehicule.numengine);
    const [couleur, setcouleur] = useState(theVehicule.couleur);
    const val = 'readonly'
    const handlerClick=async(e)=>
    {  
      if(numengine===theVehicule.numengine && couleur===theVehicule.couleur)
      {
        alert("rien n'est changé");

      }
      else
      {
        const lot = theVehicule.lot ;
        const modele = theVehicule.modele;
        const num_Chassis = theVehicule.num_Chassis;
        const ordre = theVehicule.ordre;
         e.preventDefault()
         const vehicule={lot,modele,couleur,num_Chassis,ordre,numengine}
        const res= await  fetch("http://localhost:9090/Usine/updatevehicule",{
         method:"PUT",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(vehicule)
         })
         const ve = await res.json()
         if(ve.ordre===-3)
         {
            alert("Numero de Engine déjà existe !")
         }
         else
         {
           theVehicule.numengine = numengine;
           theVehicule.couleur= couleur;
           alert("modification est bien effectuée fermez le formulaire")
         }
        
      }
        
    }

    
    

  
     return (

        <form action="">
        <div class="form-group">
          <input type="text" class="form-control" id="designation" placeholder="Num Engine" name="Num"
          value={numengine} 
          onChange={(e)=>setnum_Engine(e.target.value)}
          ></input>
          <input type="text" class="form-control" id="url" placeholder="Couleur" name="url"
          value={couleur} 
          onChange={(e)=>setcouleur(e.target.value)}
          ></input>
        </div>
        <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
      </form>

     )
}

export default EditVehicule;