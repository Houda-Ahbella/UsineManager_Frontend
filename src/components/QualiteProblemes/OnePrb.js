import { Button ,Modal } from 'react-bootstrap';
import { useState } from 'react';
const OnePrb = ({thePrb}) => {


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [designation,setdesignation] = useState(thePrb.designation)
    const Modifier=async()=>
    {
        let des=designation
        thePrb.designation=designation
        const res= await  fetch("http://localhost:9090/Usine/UpdateProbleme",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(thePrb)
        })
        const ve = await res.json()
        if(ve.id===-1)
        {
            alert("le probléme "+designation+" déjà existe")
        }
        else
        {
            thePrb.designation=des;
            setShow(false)
        }
       
    }
   
    return (
        <>
        <tr>
        
        <td>{thePrb.designation}</td>    
        <td>
        <div >
        &nbsp;&nbsp;
                   <Button variant="outline-primary"  data-toggle="modal"onClick={handleShow}>
                       <i class="bi bi-pen"></i>
                    </Button>
                 
        </div>
         </td>
        </tr>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }} >
                    <Modal.Title>
                        Modifier Probléme
                    </Modal.Title>
               </Modal.Header>
                <Modal.Body>
                <input type="text" class="form-control" id="designation" placeholder="Num Engine" name="Num"
                    value={designation}
                    onChange={(e)=>setdesignation(e.target.value)}
                ></input>
                <Button variant="primary" onClick={Modifier} >Modifier</Button>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            fermer 
                        </Button>
                </Modal.Footer>
            </Modal>
    </>
    )
}

export default OnePrb;