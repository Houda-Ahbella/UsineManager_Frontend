import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Modal,Button } from 'react-bootstrap';

const Oneproveh=({prb,Lot})=>
{
    const[observation,setobservation]=React.useState(prb.observation)
    const valideEditPrb=async()=>
    {
       prb.observation=observation;
          await fetch("http://localhost:9090/Usine/addVehiculeProbleme",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(prb)
            })
            setEditPrbshow(!EditPrbshow)
    }
    const [EditPrbshow,setEditPrbshow] = React.useState(false)
    const EditPrb=()=>
    {
          setEditPrbshow(!EditPrbshow)
    }
    const DeletePrb=async()=>
    {
        const confirmBox = window.confirm(
            "Vous voulez vraiment supprimer ce probléme?"
          )
          if (confirmBox === true)
          {
              
            await fetch("http://localhost:9090/Usine/DeleteProblemeVehicule/"+prb.key.vehiculeId+"/"+prb.key.problemeId,{
                method:"DELETE",
            headers:{"Content-Type":"application/json"}
               
                })
                window.location.assign("http://localhost:3000/SuiviProblemes?m="+Lot)
          }
    }
    return (

        <>
        <TableRow>
        <TableCell>{prb.nom}</TableCell> 
        <TableCell>{prb.observation}</TableCell> 
        <TableCell>  
            <IconButton aria-label="delete" color="primary" onClick={EditPrb}>
                <i class="bi bi-pen"></i> 
             </IconButton>
             <IconButton aria-label="delete" color="secondary" onClick={DeletePrb}>
                <i class="bi bi-trash"></i>
             </IconButton>
        </TableCell>
        </TableRow>   
            <Modal show={EditPrbshow} onHide={EditPrb}>
            <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }} >
                <Modal.Title>
                    Modifier
                    <input type="text" class="form-control"  placeholder="Observation" 
                     value={observation}
                        onChange={(e)=>{setobservation(e.target.value)}} 
                    ></input>
                    <Button variant='success' onClick={valideEditPrb}><i class="bi bi-check-circle-fill"></i></Button>
                    <Button variant="danger" onClick={EditPrb}><i class="bi bi-x-circle" ></i></Button>
                </Modal.Title>
                <Modal.Body>
              </Modal.Body>
           </Modal.Header>
         </Modal>
         </>
    );
}
export default Oneproveh;