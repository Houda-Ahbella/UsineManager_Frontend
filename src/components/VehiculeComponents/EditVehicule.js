import {  Button } from "react-bootstrap"
import { useState} from 'react';


const EditVehicule = ({theVehicule}) =>{
    const [num_Engine, setnum_Engine] = useState(theVehicule.num_Engine);
    const [couleur, setcouleur] = useState(theVehicule.couleur);
    const handlerClick=(e)=>
    {  const lot = theVehicule.lot ;
       const modele = theVehicule.modele;
       const num_Chassis = theVehicule.num_Chassis;
       const ordre = theVehicule.ordre;
        e.preventDefault()
        const vehicule={lot,modele,couleur,num_Chassis,ordre,num_Engine}
        console.log(vehicule)
        fetch("http://localhost:9090/Usine/updatevehicule",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(vehicule)
        }).then(()=>{
            console.log(" vehicule updated")
            window.location.assign('http://localhost:3000/VehiculesofLot?lot='+theVehicule.lot.num_lot);
        }
        )
        
        
    }

    
    

  
     return (

        <form action="">
        <div class="form-group">
          <input type="text" class="form-control" id="designation" placeholder="Num Engine" name="Num"
          value={num_Engine}
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