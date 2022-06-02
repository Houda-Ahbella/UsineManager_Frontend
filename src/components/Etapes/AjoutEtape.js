import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState} from 'react';
export default function AjoutEtape({themarque,theNumber}) {

   const[etapes,setetapes]=React.useState([]);
   const [ordre,setordre]=React.useState(0);
   const [des,setdes] = React.useState('');
   const [show, setShow] = useState(false);
   const marqueId = theNumber  
   const o = React.createRef()
   const  options=async()=> {
    const response = await fetch('http://localhost:9090/Usine/allEtapesNotINmarque/'+theNumber);
    const body = await response.json();
    setetapes(body)
    
  }
  const handleShow = () => 
  {
    setShow(true);
    console.log(show)
  }
  const handleClose = () => setShow(false);
    const handlerClick=async(e)=>
    {
      const stepId=o.current.value
      const id={marqueId,stepId}
      const me={id,ordre}
        const res = await fetch("http://localhost:9090/Usine/addStepINmarque",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(me)
        });
        const meorga = await res.json();
        if(meorga.ordre===-2)
        { 
          alert("il y a déjà une etape dans cette ordre")
        }
        else
        {
          window.location.assign('/etapes?n='+theNumber+'&m='+themarque)
        }

        
            
      
     }
        
     const newStep=async()=>
     {
      const id={marqueId}
      const step={des}
      const me={id,step,ordre}
      const res= await fetch("http://localhost:9090/Usine/addNewStepINmarque",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(me)
        })
        const meorga = await res.json();
        console.log(meorga)
        if(meorga.ordre===-1)
        {
          alert("cette etape est déjà existe !!")
        }
        else 
        {
          if(meorga.ordre===-2)
          alert("il y a déjà une etape dans cette ordre")
          else
          {
            window.location.assign('/etapes?n='+theNumber+'&m='+themarque)
          }
        }
       


     }
    
    

    
  return (
    
<div class="container">
  <form >
    <div class="form-group">
      <label>Etapes : </label> &nbsp;&nbsp;
      <select onClick={options} ref={o}>
      
      {etapes.map(etape =>
     
          <option value={etape.id}>{etape.des}</option>                 
              )}
             
      </select>
      <input type="number" class="form-control" id="Ordre" placeholder="Ordre" name="url"
        onChange={(e)=>{setordre(e.target.value)}} min="1"
      ></input>
    </div>
    <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button variant="primary" onClick={handleShow}>Autre</Button>
  </form>
  <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Creer Nouvelle Etape {theNumber} {themarque}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                  <input type="text"class="form-control"  placeholder="Designation" 
                  onChange={(e)=>{setdes(e.target.value)}}></input>
                  <br></br>
                  <input type="number" class="form-control" placeholder="Ordre" min="1"
                  onChange={(e)=>{setordre(e.target.value)}}></input>
                  <br></br>
               <Button variant="success" onClick={newStep}>Ajouter</Button>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}> fermer </Button>           
                </Modal.Footer>
  </Modal>
</div>
 
  );
}
