import { Button ,Modal } from 'react-bootstrap';
import { useState } from 'react';
const AjoutPrb = () => {
    
    const [designation, setdesignation] = useState('');
   const Modifier=async()=>
    {
      
    if(designation==='')
    {
        alert("le champs est vide")
    }
    else
    {
     const prb={designation}
     console.log(prb)
     const res= await  fetch("http://localhost:9090/Usine/UpdateProbleme",{
     method:"PUT",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(prb)
     })
     const ve = await res.json()
     console.log(ve)
     if(ve.id===-1)
     {
         alert("le probléme "+designation+" déjà existe")
     }
     else
     {
        
        window.location.assign("/Allproblemes");
     }
    }   
    

}
    
   
    return (
        <>                
            <input type="text" class="form-control" id="designation" placeholder="Designation" name="Num"
                onChange={(e)=>setdesignation(e.target.value)}
            ></input>
            <Button variant="primary" onClick={Modifier} >Enregistrer</Button>
        
    </>
    )
}

export default AjoutPrb;