import {useNavigate} from "react-router-dom"
import { useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip ,Card} from 'react-bootstrap';
import EditLot from './EdiLot'






const OneLot = ({theLot}) => {
 
    

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const navigate= useNavigate();
    const [showsupp, setShowsupp] = useState(false);
    const handleShowsupp = () => setShowsupp(true);
    const handleClosesupp = () => setShowsupp(false);
    const SupprimerLot = () => {
        fetch("http://localhost:9090/Usine/deletelot/"+theLot.num_lot,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
            }).then(()=>{
                console.log(" vehicule deleted")
                window.location.assign('http://localhost:3000/AllLot');
            }
            )
        
    } 

    useEffect(() => {
        handleClose()
    }, [theLot])

    return (
        <>
  <Card>
      <Card.Header> Numero : {theLot.num_lot} </Card.Header>
    <Card.Img variant="top" src={theLot.modeleLot.marque.url} height="150" width="80" />
    <Card.Body>
      <Card.Title>Marque : {theLot.modeleLot.marque.designation}  
                <br></br> Modele: {theLot.modeleLot.designation}
      </Card.Title>
      <Card.Text>
         N0 Bach : {theLot.num_bach} <br></br>
         CONNAISSEMENT :     {theLot.connaissement}   <br></br>
         Nombre de vehicule : {theLot.nombre_vehicules} <br></br>
         Date d'entrée:  {theLot.date_Entree}
      </Card.Text>
    </Card.Body>
    <Card.Footer style={{ background: 'rgb(224 224 224 / 57%)' }} >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <OverlayTrigger
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Modifier
                                </Tooltip>
                            }>
                            <Button onClick={handleShow} variant="outline-primary" data-toggle="modal">
                            <i class="bi bi-pen"></i> </Button>
                                
            </OverlayTrigger>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <OverlayTrigger
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Vehicules
                                </Tooltip>
                            }>
                    <Button  variant="outline-primary"  onClick={()=> {
                        navigate('/VehiculesofLot?lot='+theLot.num_lot)}} > 
                        <span><i class="bi bi-journal-plus"></i></span>
                    </Button>
                                
    </OverlayTrigger>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <OverlayTrigger
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Supprimer
                                </Tooltip>
                            }>
                <Button   variant="outline-danger" onClick={handleShowsupp} > 
                        <span><i class="bi bi-trash3-fill"></i></span>
                </Button>
                                
    </OverlayTrigger>
    </Card.Footer>
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
        </>
    )
}

export default OneLot;