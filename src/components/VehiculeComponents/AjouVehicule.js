import {  Button ,Modal} from "react-bootstrap"
import React from "react"

const AjoutVehicule = ({theLot}) =>{
    const [num_Chassis,setnum_Chassis]=React.useState('')
    const [num_Engine, setnum_Engine] = React.useState('')
    const [couleur, setcouleur] = React.useState('')
    const [ordre, setordre] = React.useState('')
    const [showExisteModal, setshowExisteModal] = React.useState(false);
    const handlerClick=async(e)=>
    {

        
        e.preventDefault()
        const response = await fetch('http://localhost:9090/Usine/findlot/'+theLot);
        const l = await response.json();
        const lot = l[0];
        const modele = lot.modeleLot;
       
        const ex = await fetch('http://localhost:9090/Usine/findvehicule/'+ num_Chassis);
        const existe = await ex.json();
       
        const vehicule={lot,modele,num_Chassis,num_Engine,couleur,ordre}
        console.log(vehicule)
        if(existe.timestamp)
        {
         
          
            fetch("http://localhost:9090/Usine/addvehicule",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(vehicule)
            }).then(()=>{
                console.log(" vehicule added")
                window.location.assign('http://localhost:3000/VehiculesofLot?lot='+theLot);
            }
            )
         
             
    
            
        }
        else 
        {
          setshowExisteModal(true);
          setTimeout(()=> {
            setshowExisteModal(false);
          }, 2000)
        }
        
      
        
        
      // 
    }

    
    

  
     return (
<>
        <form action="">
        <div class="form-group">
          <input type="text" class="form-control" id="url" placeholder="Num chassis" name="marque"
          value={num_Chassis}   onChange={(e)=>setnum_Chassis(e.target.value)}
          ></input>
          <input type="text" class="form-control" id="designation" placeholder="Ordre dans le lot" name="Designation"
          value={ordre}
          onChange={(e)=>setordre(e.target.value)}
          ></input>
        <input type="text" class="form-control" id="designation" placeholder="Num Engine" name="Designation"
          value={num_Engine}
          onChange={(e)=>setnum_Engine(e.target.value)}
          ></input>
        <input type="text" class="form-control" id="designation" placeholder="Couleur" name="Designation"
          value={couleur}
          onChange={(e)=>setcouleur(e.target.value)}
          ></input>
        </div>
        <Button variant="danger" onClick={handlerClick}>Enregistrer</Button>
      </form>
                   <Modal show={showExisteModal} >
                   <Modal.Header closeButton>
                       <Modal.Title>
                           Vehicule Num {num_Chassis} déjà existe 
                           <br></br>
                           Modifiez vous informations ! 
                       </Modal.Title>
                   </Modal.Header>
               </Modal>
</>

     )
}

export default AjoutVehicule;