import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import { useState} from 'react';
import {Modal ,Button } from 'react-bootstrap'
const OneEtape = ({step,role}) => {
    const [Show, setshow] = useState(false);
    const [date,setdate] = useState('')
    const o = React.createRef()

    const EditEtapeShow=()=>
   {
       if(Show===false) setshow(true)
       else setshow(false)
   }
   const EditerEtape=()=>
   { 
    if(date==='' & o.current.value==='Choisir')
    {
        alert("les champs sont vides")
    } 
    else
    {
        if(date!=''){step.date_fin=date;}
        if(o.current.value!='Choisir'){step.etat = o.current.value;}
          fetch("http://localhost:9090/Usine/updateFinEtape",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(step)
            }).then(()=>{
                setshow(false)
            }
            )
    }
   

   }
   const UpdateEtape=({role})=>
   {
        if(role==1) 
        {
            return (                      
                <TableCell>
                <IconButton aria-label="delete" color="primary" onClick={EditEtapeShow}>
                <i class="bi bi-pen"></i> 
                </IconButton>  
                </TableCell>);
        }
   }
 

    return (
        
        <>
       <TableRow class={step.etat}>
                        <TableCell > {step.nomStep}  </TableCell>
                        <TableCell>{step.date_fin}</TableCell>
                        <TableCell >{step.etat}</TableCell>
                        <UpdateEtape role={role}></UpdateEtape>
  
         </TableRow>


         <Modal show={Show} onHide={EditEtapeShow}>
           <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Modifier étape de {step.nomStep} pour vehicule {step.key.vehiculeId}
                    </Modal.Title>
                </Modal.Header>
           <Modal.Body>
           
           <div class="form-group">
            Date Fin : 
             <input type="date" class="form-control"
              onChange={(e)=>{setdate(e.target.value)}}
             ></input> 
             Etat :   
              <select class="form-select" aria-label="Choisir etat" ref={o}>
                <option>Choisir</option>
                <option>Bloqué</option>
                <option>Fini</option>
              </select>
              <br></br>
              <Button variant="primary" onClick={EditerEtape} ><CheckCircleOutlinedIcon/>   Valider  </Button>
            </div>  
           </Modal.Body>
           <Modal.Footer>
           <Button variant="secondary" onClick={EditEtapeShow} >  annuler   </Button>  
           </Modal.Footer>
       </Modal>
    </>
    )
}

export default OneEtape;