import {  Button ,Modal} from "react-bootstrap"
import React from "react"

const AjoutVehicule = ({theLot}) =>{
    const [num_Chassis,setnum_Chassis]=React.useState('')
    const [numengine, setnum_Engine] = React.useState('')
    const [couleur, setcouleur] = React.useState('')
    const [ordre, setordre] = React.useState('')
   
    
    const handlerClick=async(e)=>
    {

        
        e.preventDefault()
        const response = await fetch('http://localhost:9090/Usine/findlot/'+theLot);
        const l = await response.json();
        const lot = l[0];
        const modele = lot.modeleLot;
     if(num_Chassis===''||numengine===''||ordre==='')
      {
          alert("certains champs sont nulls !!")
      }
      else
      {
        const vehicule={lot,modele,num_Chassis,numengine,couleur,ordre}
        console.log(vehicule)
         
          
          const ve = await fetch("http://localhost:9090/Usine/addvehicule",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(vehicule)
            });
            const vehiculeres = await ve.json();
            console.log(vehiculeres)
             if(vehiculeres.ordre===-1)
             {
              alert("Vehicule Num "+ num_Chassis + " déjà existe Modifiez vous informations ! ")
             }
             else if(vehiculeres.ordre===-2)
             {
              alert("l'ordre "+ ordre + " déjà existe Modifiez vous informations ! ")
             }
             else if(vehiculeres.ordre===-3)
             {
              alert("Engine "+ numengine + " déjà existe Modifiez vous informations ! ")
             }
             else
             {
               window.location.assign("/VehiculesofLot?lot="+theLot)
             }
    
            
 
        
      }    
      
        
        
      
    }

    
    

  
     return (
<>
        <form action="">
        <div class="form-group">
          <input type="text" class="form-control" id="url" placeholder="Num chassis" name="marque"
          value={num_Chassis}   onChange={(e)=>setnum_Chassis(e.target.value)}
          ></input>
          <input type="Number" class="form-control" id="designation" placeholder="Ordre dans le lot" name="Designation"
          value={ordre} min="1"
          onChange={(e)=>setordre(e.target.value)}
          ></input>
        <input type="text" class="form-control" id="designation" placeholder="Num Engine" name="Designation"
          value={numengine}
          onChange={(e)=>setnum_Engine(e.target.value)}
          ></input>
        <input type="text" class="form-control" id="designation" placeholder="Couleur" name="Designation"
          value={couleur}
          onChange={(e)=>setcouleur(e.target.value)}
          ></input>
        </div>
        <Button variant="danger" onClick={handlerClick}>Enregistrer</Button>
      </form>
                   
</>

     )
}

export default AjoutVehicule;