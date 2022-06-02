import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'
import { Modal,Button } from 'react-bootstrap';
import { useState} from 'react';
import Oneproveh from './Oneproveh'


 const PrbsOfVehicule=({prbs,Numchassis,Lot})=>
{
    const [AjoutePrbshow , setAjoutePrbshow] = useState(false)
    const [problemes, setproblemes] = useState([])
    const o = React.createRef()
    const [observation,setobservation] = useState("")
    const geProblemes=async()=>
    {
        const response = await fetch('http://localhost:9090/Usine/allProblemes');
        const body = await response.json();
        setproblemes(body)
    }
    const AjoutePrb=()=>
    {
        
        setAjoutePrbshow(!AjoutePrbshow)
    }
   
    const ValideAjout=async()=>
    { 
        let problemeId=o.current.value
        let vehiculeId = Numchassis
        let key = {problemeId,vehiculeId}
        const pr={key ,observation}
        let a = false
       
        console.log(problemeId)
        for(let i =0; i<prbs.length ; i++)
           {   
               if((prbs[i].key.problemeId+'')===problemeId)
               { a = true
               break;}
            else{
                console.log("false")
            }
           }
      if(a===false )
      {
         
         const res= await fetch("http://localhost:9090/Usine/addVehiculeProbleme",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(pr)
            })
             let p = await res.json()
            prbs.push(p);
            console.log(prbs)
           setAjoutePrbshow(false)
           

      }
      else
      {
          alert("probléme déjà existe")

      }       
  
    }
   
   
    return (
    

   <>

       
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Les Problémes de qualité
              </Typography>
            <Tooltip title = "Ajouter">
            <IconButton >
                <i class="bi bi-plus-circle-fill"onClick={AjoutePrb}></i>
              </IconButton>
            </Tooltip>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell>Probléme</TableCell>
                    <TableCell>Observation</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                {prbs.map((prb) => (
                    <Oneproveh prb={prb} Lot={Lot}></Oneproveh>
                    
                        ))}
                               
                </TableBody>
              </Table>
            </Box>
        
      <Modal show={AjoutePrbshow} onHide={AjoutePrb}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }} >
                    <Modal.Title>
                        Ajouter probleme
                    </Modal.Title>
                    <Modal.Body>
                    <select class="form-select" onClick={geProblemes} ref={o}>
                    {problemes.map((prb) => (
                    <option value={prb.id}>{prb.designation}</option>     
                     ))}
                          
                    </select>
                    <input type="text" class="form-control"  placeholder="Observation" 
                        onChange={(e)=>{setobservation(e.target.value)}} 
                    ></input>
                    <Button variant='success' onClick={ValideAjout}><i class="bi bi-check-circle-fill"></i></Button>
                    <Button variant="danger" onClick={AjoutePrb}><i class="bi bi-x-circle" ></i></Button>
                    </Modal.Body>
               </Modal.Header>
               
     </Modal>
 
    </>
    );
}
export default PrbsOfVehicule;