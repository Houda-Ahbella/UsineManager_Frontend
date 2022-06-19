import * as React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Button  } from "react-bootstrap"
const animatedComponents = makeAnimated();
 const Countries = [
      { label: "Ordonnanceur", value: 1 },
      { label: "Responsable d'ordonnancement", value: 2 },
      { label: "Responsable de suivi de production", value: 3 },
      { label: "Responsable de suivi de qualité", value: 4 },
      { label: "Responsable d'usine", value: 5 },
      { label: "Admin", value: 6 },
    ];
    

export default function AjoutU({utlisateurId}) {
    const [nom,setnom] = React.useState("");
    const [prenom,setprenom] = React.useState("");
    const [email,setemail] = React.useState("");
    const [password , setpassword] = React.useState("");
    const [myroles, setmyroles] = React.useState([]);
    const Ajouter=async()=>
    {
        let roles = [];
        if(nom ==="")
        {
            alert("la nom est vide ");
        }
        else if(prenom==="")
        {
            alert("le prenom est vide")
        }
        else if(email==="")
        {
            alert("email est vide")
        }
        else if(password==="")
        {
            alert("mot de passe est vide")
        }
        else if(myroles.length===0)
        {
            alert("il faut spécifier un role")
        }
        else
        {
                    for(let i = 0; i<myroles.length; i++)
                    {
                    let roleId = myroles[i].value;
                        console.log(myroles[i])
                        let key ={roleId};
                        let a = {key}
                        roles.push(a);
                    }
                    
                    let compte = {email,password};
                    let utilisateur = {nom,prenom,compte,roles}
                
                    const ve = await fetch("http://localhost:9090/Usine/addUtilisateur",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(utilisateur)
                        });
                let a = await ve.json();
                console.log(a)
                if(a.id==-1)
                {
                    alert("L'utilisateur déjà existe ");
                }
                else if(a.id==-2)
                {
                    alert("L'email est déjà existe")
                }
                else
                {
                    
                    window.location.assign("/Allutilisateurs?m="+utlisateurId);
                }
        }
        
    }
   
     
    
    
    return (
      <>
      <form action="">
                <div class="form-group">
                   Nom : <input  type="text" class="form-control"  placeholder="Nom" name="Nom"
                   onChange={(e)=>setnom(e.target.value)}></input>
                   Prenom : <input type="text" class="form-control" placeholder="Prenom" name="Prenom"
                   onChange={(e)=>setprenom(e.target.value)}></input>
                   Email : <input type="email" class="form-control" placeholder="Email" name="Email"
                   onChange={(e)=>setemail(e.target.value)}></input>
                   Mot de passe  : <input type="password" class="form-control" placeholder="Mot de passe"
                    name="Mot de passe" onChange={(e)=>setpassword(e.target.value)}></input>
                   <div className="container">
                        <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                        Roles :  <Select options={Countries} components={animatedComponents} isMulti 
                         onChange={(e)=>setmyroles(e)}/>
                        </div>
                        <div className="col-md-4"></div>
                        </div>
                    </div>
                   
                   <br></br>
                   <Button variant="primary" onClick={Ajouter} >    Ajouter   </Button>
                   &nbsp;
                   </div> </form>
                
       </>
    );
  }