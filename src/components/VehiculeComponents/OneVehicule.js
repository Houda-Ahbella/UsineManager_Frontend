import { Button ,Modal , OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';
import EditVehicule from "./EditVehicule"
const OneVehicule = ({theVehicule}) => {


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    const SupprimerVehicule =(e)=>{
        e.preventDefault()
        fetch("http://localhost:9090/Usine/deletevehicule/"+theVehicule.num_Chassis,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
            }).then(()=>{
                console.log(" vehicule deleted")
                window.location.assign('http://localhost:3000/VehiculesofLot?lot='+theVehicule.lot.num_lot);
            }
            )
       

    }
    return (
        <>
        <td>{theVehicule.ordre}</td>
        <td>{theVehicule.num_Chassis}</td>
        <td>{theVehicule.num_Engine}</td>
        <td>{theVehicule.couleur}</td>
        <td>{theVehicule.modele.designation}</td>
        <td>{theVehicule.modele.marque.designation}</td>
        <td>
        <div >
                    <OverlayTrigger overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Modifier
                                    </Tooltip>
                                }>
                                <Button variant="outline-primary"  data-toggle="modal"onClick={handleShow}><i class="bi bi-pen"></i></Button>
                  </OverlayTrigger>&nbsp;
                  <OverlayTrigger overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Effacer
                                    </Tooltip>
                                }>
                                <Button  variant="outline-danger" data-toggle="modal" onClick={handleShow2}>
                                    <i class="bi bi-trash3-fill"></i>
                                </Button>
                  </OverlayTrigger>	
        </div>
       
        </td>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }} >
                    <Modal.Title>
                        Modifier Vehicule
                    </Modal.Title>
               </Modal.Header>
                <Modal.Body>
                  <EditVehicule theVehicule={theVehicule} ></EditVehicule>        
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            fermer 
                        </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Body class="alert alert-danger" role="alert">
                   Vous voulez vraimenet supprimee ce vehicule de Num {theVehicule.num_Chassis}
                   <br></br>
                   <Button variant="danger" onClick={SupprimerVehicule}>    oui   </Button>
                   &nbsp;
                   <Button variant="secondary" onClick={handleClose2} >  Non  </Button>
                </Modal.Body>
            </Modal>
    </>
    )
}

export default OneVehicule;