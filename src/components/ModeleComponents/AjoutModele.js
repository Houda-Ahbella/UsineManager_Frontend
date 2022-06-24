import {  Button , Modal} from "react-bootstrap"
import React from "react"

const AjoutModele = ({theMarque,id}) =>{
    const [designation,setDesignation]=React.useState('')
    const [existe,setexiste] = React.useState(false)
    const [require,setrequire] = React.useState(false)
    const handlerClick=async(e)=>
    {

      if(designation==='')
        {
          setrequire(true)
          setTimeout(()=> {  setrequire(false) }, 3000)

        }
      else
        {
        const response = await fetch('http://localhost:9090/Usine/findmarque/'+theMarque);
        const marque = await response.json();
        e.preventDefault();
        const modele={designation,marque}
        console.log(modele)
        const r = await fetch("http://localhost:9090/Usine/addmodele",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(modele)
        });
        const ma = await r.json();
        if(ma.num_modele===0)
        {
          setexiste(true)
          setTimeout(()=> {   setexiste(false) }, 2000)
             
        }
        else
        {
          window.location.assign('/marque?m='+theMarque+'&des='+marque.designation+'&n='+id);
        }
      }

    }

    
    

  
     return (
      <>
        <form action="">
        <div class="form-group">
          <label >Marque</label>
          <input type="text" class="form-control" id="designation" placeholder="Designation" name="Designation"
          value={designation}
          onChange={(e)=>setDesignation(e.target.value)}
          ></input>
          
        </div>
        <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
      </form>
       <Modal show={existe}>
          <Modal.Title class="alert alert-danger" role="alert">
            La marque {designation} déjà existe
          </Modal.Title>         
       </Modal>
       <Modal show={require}>
                <Modal.Title class="alert alert-danger" role="alert">
                 vérifiez vous informations
                </Modal.Title>         
       </Modal>
    </>
     )
}

export default AjoutModele;