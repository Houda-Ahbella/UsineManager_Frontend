import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from 'react-bootstrap';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip'
import { useState} from 'react';




const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
export default function OneU({row}) {
  
   const [show,setShow] = useState(false);
   const [showEdit,setshowEdit] = useState(false);
   const [prenom,setprenom] = React.useState(row.prenom);
   const [email,setemail] = React.useState(row.compte.email);
   const [nom,setnom] = React.useState(row.nom);
   const [password , setpassword] = React.useState(row.compte.password);
   const [id,setid] = React.useState(row.id)
   const [idCompte,setidCompte] = React.useState(row.compte.idCompte);
    const showmore=()=>
    {
        setShow(!show);
    }
    const editModal=()=>{ setshowEdit(!showEdit)}
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
    const Modifier = async()=>
    {
        let compte = {idCompte,email,password};
        let utilisateur = {id,nom,prenom,compte}
        console.log(utilisateur);
        const ve = await fetch("http://localhost:9090/Usine/UpdateUtilisateur",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(utilisateur)
            });
         let a = await ve.json();
     
        
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
                    <Button variant="outline-primary"  data-toggle="modal" onClick={editModal}>
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
        <Modal show={showEdit} onHide={editModal}>
            <Modal.Header>
                Modifier Modal
            </Modal.Header>
            <Modal.Body>
            <form action="">
                <div class="form-group">
                   Nom : <input  type="text" class="form-control"  placeholder="Nom" name="Nom"
                   value={nom}
                   onChange={(e)=>setnom(e.target.value)}></input>
                   Prenom : <input type="text" class="form-control" placeholder="Prenom" name="Prenom"
                   value={prenom}
                   onChange={(e)=>setprenom(e.target.value)}></input>
                   Email : <input type="text" class="form-control" placeholder="Email" name="Email"
                   value={email}
                   onChange={(e)=>setemail(e.target.value)}></input>
                   Mot de passe  : <input type="password" class="form-control" placeholder="Mot de passe"
                   value={password} minLength="6"
                    name="Mot de passe" onChange={(e)=>setpassword(e.target.value)}></input>
                  
                   
                   <br></br>
                   <Button variant="primary" onClick={Modifier} >    Modifier   </Button>
                   &nbsp;
                   </div> </form>
    
                <Button variant="outline-dark" onClick={editModal}> fermer</Button>
            </Modal.Body>
        </Modal>
       </>
    );
  }