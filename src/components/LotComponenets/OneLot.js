import {useNavigate} from "react-router-dom"
import { useState, useEffect} from 'react';
import { Modal, Button ,Card} from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress'
import EditLot from './EdiLot'
const OneLot = ({theLot,role,id}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const navigate= useNavigate();
    const [showsupp, setShowsupp] = useState(false);
    const [showE,setshowE] = useState(false)
    const handleShowsupp = () => setShowsupp(true);
    const handleClosesupp = () => setShowsupp(false);
    const SupprimerLot = () => {
        setShowsupp(false)
        setshowE(true)
        fetch("http://localhost:9090/Usine/deletelot/"+theLot.num_lot,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
            }).then(()=>{
                console.log(" vehicule deleted")
                window.location.assign('http://localhost:3000/AllLot');
            }
            )
        
    } 
    let Supp=false;
    let Eta = false;
    let Prob = false;
    let Ordon = false;
    let n = role.length;
    
    for(let i=0;i<n;i++)
    {   

        if(role[i].key.roleId==1)
        {
            Ordon=true;
        }
         else if(role[i].key.roleId==2)
         {
             Supp = true; Ordon=true;
            
         }
         else if(role[i].key.roleId==3)
         {
             Eta = true;
         }
         else if(role[i].key.roleId==4)
         {
             Prob = true;
         }
    }
    

   
    
    return (
        
        <>
  <Card style={{ borderRadius : 30 , borderWidth: 2, borderColor : "black" }}>
     
   
    <Card.Body>
      <Card.Title> 
            <label class="Number" >Numero : {theLot.num_lot}</label>
            <br></br> Marque : {theLot.modeleLot.marque.designation}  
            <br></br> Modele: {theLot.modeleLot.designation}
      </Card.Title>
      <Card.Text >
          
         N0 Bach : {theLot.num_bach} <br></br>
         CONNAISSEMENT :     {theLot.connaissement}   <br></br>
         Nombre de vehicule : {theLot.nombre_vehicules} <br></br>
         Date d'entrée:  {theLot.date_Entree}  <br></br><br></br>
         {Ordon? ( <>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         
                <Button onClick={handleShow} variant="outline-dark" data-toggle="modal">
                   <i class="bi bi-pen"></i> 
                </Button>
                                        
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button  variant="outline-dark"  onClick={()=> {
                                navigate('/VehiculesofLot?lot='+theLot.num_lot+'&m='+id)}} > 
                                <span><i class="bi bi-truck"></i></span>
                    </Button>
            </> ) : (<></>
                 )}
                 
                                   
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {Supp? (<Button   variant="outline-danger" onClick={handleShowsupp} > 
                        <span><i class="bi bi-trash3-fill"></i></span>
                 </Button>) : (<></>
                 )}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
           {Eta? (<Button   variant="outline-dark" onClick={()=> {
                     navigate('/EtapesOfvehicules?m='+theLot.num_lot+'&n='+id)}} > 
                        <span><i class="bi bi-bar-chart-steps"></i></span>
                 </Button>) : (<></>
           )}
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           {Prob? (<Button   variant="outline-dark" onClick={()=> {
                     navigate('/SuiviProblemes?m='+theLot.num_lot+'&n='+id)}} > 
                        <span><i class="bi bi-wrench-adjustable"></i></span>
                 </Button>) : (<></>
           )}
                 
                                        
      </Card.Text>
    </Card.Body>
   
  </Card> 
   
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ background: 'rgb(220 220 220 / 15%)' }} >
                    <Modal.Title>
                        Modifier Lot
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditLot theLot={theLot}></EditLot>                    
                </Modal.Body>
                <Modal.Footer >
                        <Button variant="secondary" onClick={handleClose}>
                            fermer 
                        </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showsupp} onHide={handleClosesupp}>
                <Modal.Body class="alert alert-danger" role="alert">
                
                           <pre>
                            Vous voulez vraimenet supprimer le lot num {theLot.num_lot} 
                            <br></br>
                            Remarque : La suppression de ce lot implique la suprression
                            <br></br>
                            de tous les vehicules  
                         </pre>
                           
                         <Button variant="outline-danger" onClick={SupprimerLot}>    oui   </Button>
                        <Button variant="outline-secondary" onClick={handleClosesupp}> Non    </Button>
                </Modal.Body>
                
            </Modal>
            <Modal show={showE} >
                <Modal.Body class="alert alert-danger" role="alert">
                 <CircularProgress disableShrink /> &nbsp;&nbsp;  Suppression en cours
                </Modal.Body> 
            </Modal>
        </>
    )
}

export default OneLot;