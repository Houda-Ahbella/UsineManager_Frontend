import { Button } from "react-bootstrap";
const OneModele = ({modele}) => {

    return (
        <>
        <td>{modele.designation}</td>
        <td><div>
                <Button variant="outline-dark" data-toggle="modal">
                   <i class="bi bi-pen"></i> 
                </Button>    &nbsp;
                <Button   variant="outline-danger" > 
                   <span><i class="bi bi-trash3-fill"></i></span>
                 </Button>
              

        </div></td>
    </>
    )
}

export default OneModele;