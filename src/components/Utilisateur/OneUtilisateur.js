import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from 'react-bootstrap';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip'
import { useState} from 'react';
;


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
export default function OneU({row}) {
  
   const [show,setShow] = useState(false);
    const showmore=()=>
    {
        setShow(!show);
    }
    const Supprimer = ()=>
    {
        const confirmBox = window.confirm("Si vous supprimez l'utilisateur "+ row.nom +" " + row.prenom)
            if(confirmBox==false)
            {
               return;
            }
            else
            {
                fetch("http://localhost:9090/Usine/DeleteUtilisateur/"+row.id,{
                    method:"DELETE",
                    headers:{"Content-Type":"application/json"}
                    }).then(()=>{
                        
                        window.location.assign('/Allutilisateurs?m=2');
                    })

            }
    }
 
    const classes = useRowStyles();
    return (
      <>
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell>{row.nom}</TableCell>
          <TableCell >{row.prenom}</TableCell>
          <TableCell style={{width:'40%'}}>{row.role}</TableCell>  
          <TableCell >
          <div >
                    
                    <Button  variant="outline-primary" data-toggle="modal" onClick={showmore}>
                         p
                     </Button>&nbsp;
                    <Button variant="outline-primary"  data-toggle="modal">
                        <i class="bi bi-pen"></i>
                     </Button>&nbsp;
                   
                     <Button  variant="outline-danger" data-toggle="modal" onClick={Supprimer} >
                         <i class="bi bi-trash3-fill" ></i>
                     </Button>&nbsp;
                    
                  
         </div>
          </TableCell>
        </TableRow>
      
       </React.Fragment>
        <Modal show={show} onHide={showmore}>
            <Modal.Header>
                Informations sécurisés
            </Modal.Header>
            <Modal.Body>
                Email : {row.compte.email}
                <br></br>
                Mot de passe : {row.compte.password} 
                <br></br>
                <Button variant="outline-dark" onClick={showmore}> fermer</Button>
            </Modal.Body>
        </Modal>
       </>
    );
  }