import {Button , Modal} from "react-bootstrap"
import { useState } from 'react';
import EditEtape from "./EditEtape";
const OneModele = ({etape,id}) => {
    const [Effaceshow, setEffaceshow] = useState(false);
    const [Modifiershow, setModifiershow] = useState(false);
    const Effacer=()=>
    {  if(Effaceshow===false)
        setEffaceshow(true)
        else  setEffaceshow(false)
    }
    const Modifier=()=>
    {    setModifiershow(!Modifiershow)
    }
    const SupprimerEtape=()=>
    {
        console.log("i m here")
        fetch("http://localhost:9090/Usine/deleteEtapeFROMmarque/"+etape.id.stepId+"/"+etape.id.marqueId,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
            }).then(()=>{
                console.log(" Etape deleted")
                window.location.assign('/etapes?n='+etape.marque.num_marque+'&m='+etape.marque.designation+'&id='+id)
            }
            )
       
    }

   

    return (
        <>
        <td>{etape.step.des}</td>
        <td>{etape.ordre}</td>
        <td> 
        <div >
                   
                                <Button variant="outline-primary"  data-toggle="modal"
                                onClick={Modifier}
                                ><i class="bi bi-pen"></i></Button>
                                &nbsp;
                  
                                <Button  variant="outline-danger" data-toggle="modal"
                                onClick={Effacer}
                                >
                                    <i class="bi bi-trash3-fill"></i>
                                </Button>
                
        </div>
        </td>
        <Modal show={Effaceshow} onHide={Effacer}>
                <Modal.Body class="alert alert-danger" role="alert">
                   Vous voulez vraimenet éliminée l'étape de production {etape.step.des} 
                   <br></br>
                   <Button variant="danger" onClick={SupprimerEtape}>    oui   </Button>
                   &nbsp;
                   <Button variant="secondary" onClick={Effacer} >  Non  </Button>
                </Modal.Body>
            </Modal>
            <Modal show={Modifiershow} onHide={Modifier}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }} >
                    <Modal.Title>
                        Modifier Etape
                    </Modal.Title>
               </Modal.Header>
                <Modal.Body>
                    <EditEtape etape={etape} id={id}></EditEtape>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={Modifier}>
                            fermer 
                        </Button>
                </Modal.Footer>
            </Modal>
    </>
    )
}

export default OneModele;