import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from 'react-bootstrap';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { useState} from 'react';




const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
export default function OneU({row,m}) {
  
   const [show,setShow] = useState(false);
   const [showEdit,setshowEdit] = useState(false);
   const [prenom,setprenom] = React.useState(row.prenom);
   const [email,setemail] = React.useState(row.compte.email);
   const [nom,setnom] = React.useState(row.nom);
   const [password , setpassword] = React.useState(row.compte.password);
   const [id,setid] = React.useState(row.id)
   const [idCompte,setidCompte] = React.useState(row.compte.idCompte);
   const [ShowRoles,setShowRoles] = React.useState(false);
   let myroles = [
    {id :1,nom : "Ordonnanceur"}
   ,{id :2,nom : "Responsable d'ordonnancement"}
   ,{id :3,nom : "Responsable de suivi de production"}
   ,{id :4,nom : "Responsable de suivi de qualité"}
   ,{id :5,nom : "Responsable d'usine"}
   ,{id :6,nom : "Admin"}];
    const showmore=()=>
    {
        setShow(!show);
    }
    const editModal=()=>{ setshowEdit(!showEdit)}
    const rolemodal=()=>{
        for(let i = 0; i< row.count ; i++)
        {
            
            
            let r = row.roles[i].key;
            if(r.roleId==1){setSelected1(true)}
            else if(r.roleId==2){setSelected2(true)}
            else if(r.roleId==3){setSelected3(true)}
            else if(r.roleId==4){setSelected4(true)}
            else if(r.roleId==5){setSelected5(true)}
            else if(r.roleId==6){setSelected6(true)}
           
        }
        setShowRoles(!ShowRoles)}
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
                        
                        window.location.assign('/Allutilisateurs?m='+m);
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
      window.location.assign("/Allutilisateurs?m="+m);
     
        
    }
    const [selected1, setSelected1] = useState(false); const o1= React.useRef();
    const [selected2, setSelected2] = useState(false); const o2= React.useRef();
    const [selected3, setSelected3] = useState(false); const o3= React.useRef();
    const [selected4, setSelected4] = useState(false); const o4= React.useRef();
    const [selected5, setSelected5] = useState(false); const o5= React.useRef();
    const [selected6, setSelected6] = useState(false); const o6= React.useRef();
    const ModifierRoles =async()=>
    {
        let array = [];
        array.push(row.id);
        if(selected1===true) {array.push(1); }
        else { array.push(0);}
        if(selected2===true) {array.push(1); }
        else { array.push(0);}
        if(selected3===true) {array.push(1); }
        else { array.push(0);}
        if(selected4===true) {array.push(1); }
        else { array.push(0);}
        if(selected5===true) {array.push(1); }
        else { array.push(0);}
        if(selected6===true) {array.push(1); }
        else { array.push(0);}
        await fetch("http://localhost:9090/Usine/UpdateRoleofutilisateur",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(array)
            });
        window.location.assign("/Allutilisateurs?m="+m);   


    }
   
    const classes = useRowStyles();
    return (
      <>
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell>{row.nom}</TableCell>
          <TableCell >{row.prenom}</TableCell>
          <TableCell style={{width:'40%'}}>{row.role} &nbsp;
               <IconButton variant="outline-primary"  data-toggle="modal" onClick={rolemodal}>
                        <i class="bi bi-pen"></i>
                     </IconButton>
            </TableCell>  
          <TableCell >
          <div >
                    
                    <Button  variant="outline-primary" data-toggle="modal" onClick={showmore}>
                    <i class="bi bi-plus-circle"></i>
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
                Modifier utilisateur
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
        <Modal show={ShowRoles} onHide={rolemodal}>
            <Modal.Header>
                Modifier les roles
            </Modal.Header>
            <Modal.Body>
            <form action="">
            <fieldset>
                <legend>Modifier les roles :</legend>
                    <div>
                        <input type="checkbox" id="horns" name={myroles[0].nom}
                               checked={selected1} onChange={(e)=>setSelected1(!selected1)} 
                              ref={o1}>  
                        </input>
                        <label for="horns">{myroles[0].nom}</label>
                    </div>
                    <div>
                        <input type="checkbox" id="horns" name={myroles[1].nom}
                               checked={selected2} onChange={(e)=>setSelected2(!selected2)} 
                               ref={o2}></input>
                        <label for="horns">{myroles[1].nom}</label>
                    </div>
                    <div>
                        <input type="checkbox" id="horns" name={myroles[2].nom}
                               checked={selected3} onChange={(e)=>setSelected3(!selected3)}
                               ref={o3} ></input>
                        <label for="horns">{myroles[2].nom}</label>
                    </div>
                    <div>
                        <input type="checkbox" id="horns" name={myroles[3].nom}
                               checked={selected4} onChange={(e)=>setSelected4(!selected4)} 
                               ref={o4}></input>
                        <label for="horns">{myroles[3].nom}</label>
                    </div>
                    <div>
                        <input type="checkbox" id="horns" name={myroles[4].nom}
                               checked={selected5} onChange={(e)=>setSelected5(!selected5)}
                               ref={o5} ></input>
                        <label for="horns">{myroles[4].nom}</label>
                    </div>
                    <div>
                        <input type="checkbox" id="horns" name={myroles[5].nom}
                               checked={selected6} onChange={(e)=>setSelected6(!selected6)} 
                               ref={o6}></input>
                        <label for="horns">{myroles[5].nom}</label>
                    </div>
                        
                
            </fieldset>
               <Button onClick={ModifierRoles}>Modifier</Button>
            </form>
                <Button variant="outline-dark" onClick={rolemodal}> fermer</Button>
            </Modal.Body>
        </Modal>
       </>
    );
  }