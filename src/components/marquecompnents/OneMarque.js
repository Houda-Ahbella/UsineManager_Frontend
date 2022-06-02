import {useNavigate} from "react-router-dom"
import { useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip ,Card  } from 'react-bootstrap';
import EditMarque from "./EditMarque"
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../e.css'


const OneMarque = ({marque}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const navigate= useNavigate();
  

    useEffect(() => {
        handleClose()
    }, [marque])

    return (
        <>
  <Card style={{ borderRadius : 30 , borderWidth: 1 , borderColor : "black" }}>
    
    <Card.Body>
    <Card.Title>
        <img  src={marque.url} height="200" width="200" ></img> 
        <br></br>
          <label class="Number">{marque.designation}</label>
      <br></br><br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Modifier
                        </Tooltip>
                    }>
                    < Button variant="outline-dark" onClick={handleShow} data-toggle="modal"><i class="bi bi-pen"></i></Button>
    </OverlayTrigger>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   
    <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Modèles
                        </Tooltip>
                    }>
                   <Button onClick={()=> {  navigate('/marque?m='+marque.num_marque+'&des='+marque.designation)}} 
                        variant="outline-dark"><i class="bi bi-journal-plus"></i></Button>
             </OverlayTrigger>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
             <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Etapes
                        </Tooltip>
                    }>
                   <Button onClick={()=> {  navigate('/etapes?n='+marque.num_marque+'&m='+marque.designation)}}
                        variant="outline-dark"><i class="bi bi-bar-chart-steps"></i> </Button>
             </OverlayTrigger>
      </Card.Title>
    </Card.Body>
  </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header  style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title >
                        Modification d'une Marque
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditMarque theMarque={marque}></EditMarque>
                </Modal.Body>
                <Modal.Footer >
                        <Button variant="secondary" onClick={handleClose}>
                            fermer 
                        </Button>
                </Modal.Footer >
            </Modal>
        </>
    )
}

export default OneMarque;