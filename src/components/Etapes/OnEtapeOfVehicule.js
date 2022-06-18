import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import { useState} from 'react';
import {Modal ,Button } from 'react-bootstrap'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
class OneEtape extends React.Component  {
    
 
    constructor(props)
    {
      super(props); 
      this.state = {  
        stepat : [] 
        
        };
      this.AjouterEtape = this.AjouterEtape.bind(this);
    }
    
  
    async  componentDidMount()
    {
            const response = await fetch('http://localhost:9090/Usine/allEtapeOfvehiculewithetet/'+this.props.num);
             const body = await response.json();
             this.setState({ stepat: body})
            
             
         
     
          
    }
   
     AjouterEtape()
    {
        let i = this.state.stepat.length; 
        const confirmBox = window.confirm(
            "l'étape suivante est " + this.props.all[i].nomStep + " vous voulez l'ajouter ?"
          )
        if(confirmBox===true)
        {   
           let a =  this.state.stepat;
           a.push(this.props.all[i]);
           this.setState({stepat : a})
            
        }
       
        
    }
    
    
render(){
    
    return (
        <>
        
         <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Les Etapes
                </Typography>
              <button onClick={this.AjouterEtape}>Ajouter</button> 
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow >
                      <TableCell>Nom d'étape</TableCell>
                      <TableCell>Date Fin</TableCell>
                      <TableCell>Etat</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.stepat.map((step) => (
             
                    <OneEt step={step} role={this.props.role} ></OneEt>
                    ))}
                    
                      
                  </TableBody>
                </Table>
              </Box>
             
    </>
    )

                  }
}

export default OneEtape;
const OneEt = ({step,role})=>
{
    const [Show, setshow] = useState(false);
        
        
        const o = React.createRef();  
        const f = React.createRef();  
         function modal()
         {
             if(Show===true)
             setshow(false)
             else setshow(true)
         }
     
       const EditerEtape=async()=>
       {   
           
        if(f.current.value==='' & o.current.value==='Choisir')
        {
            alert("les champs sont vides")
        } 
        else
        {   let date = f.current.value; 
            let rollback1 = step.datefin; let rollback2 = step.etat;
            if(date!=''){ step.datefin=date; }
            if(o.current.value!='Choisir'){step.etat = o.current.value;}
              const body = await  fetch("http://localhost:9090/Usine/updateFinEtape",{
                      method:"PUT",
                      headers:{"Content-Type":"application/json"},
                      body:JSON.stringify(step)
                      });
              const etape = await body.json(); 
              console.log(etape);
              if(etape.ordre===-1)
              {
                  alert(etape.etat);
                  step.etat=rollback2; step.datefin=rollback1;
              }  
                
              else
              {
                  setshow(false);
              }
            }
            
        }
       
    
   
    const UpdateEtape=()=>
    {   
       
         if(role==1) 
         {
             return (  
                 <>                   
                 <TableCell>
                 <IconButton aria-label="delete" color="primary" onClick={ modal   
                 }>
                 <i class="bi bi-pen"></i> 
                 </IconButton>  
                 </TableCell>
                       
                     <Modal show={Show} onHide={modal }>
                             <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                             
                             </Modal.Header>
                 
                             {/*   Modifier étape de {step.nomStep} pour vehicule {step.key.vehiculeId} */ }
                         
                                 <Modal.Body>
                                         <div class="form-group">
                                         Date Fin : 
                                         <input type="date" class="form-control"
                                        ref={f}
                                         pattern="\d{4}-\d{2}-\d{2}"></input> 
                                         Etat :   
                                         <select class="form-select" aria-label="Choisir etat" ref={o}>
                                         <option>Choisir</option>
                                         <option>Bloqué</option>
                                         <option>Fini</option>
                                         </select>
                                         <br></br>
                                         <Button variant="primary" onClick={EditerEtape } ><CheckCircleOutlinedIcon/>   Valider  </Button>
                                         </div>  
                                 </Modal.Body>
                                 
                                 <Modal.Footer>
                                     <Button variant="secondary" onClick={modal} >  annuler   </Button>  
                                 </Modal.Footer>
                         </Modal>
                 </>);
         }
    }
        
   

    return(
        
     <>                       
        <TableRow class={step.etat}>
            <TableCell > {step.nomStep}  </TableCell>
            <TableCell>{step.datefin}</TableCell>
            <TableCell >{step.etat}</TableCell>
            <UpdateEtape role={role} step={step}></UpdateEtape>
        </TableRow>  
       
       </>
    )
}
