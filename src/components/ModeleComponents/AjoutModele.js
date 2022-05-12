import {  Button } from "react-bootstrap"
import { useState} from 'react';
import React from "react"

const AjoutModele = ({theMarque}) =>{
    const [designation,setDesignation]=React.useState('')
    const handlerClick=async(e)=>
    {

        const response = await fetch('http://localhost:9090/Usine/findmarque/'+theMarque);
        const marque = await response.json();
        
        e.preventDefault()
       
        const modele={designation,marque}
        console.log(modele)
        fetch("http://localhost:9090/Usine/addmodele",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(modele)
        }).then(()=>{
            console.log(" marque updated")
            window.location.assign('http://localhost:3000/marque?m='+theMarque);
        }
        )
         
        
        
      // 
    }

    
    

  
     return (

        <form action="">
        <div class="form-group">
          <label >Marque</label>
          <input type="text" class="form-control" id="url" placeholder="url" name="marque"
          value={theMarque} readOnly
          ></input>
          <input type="text" class="form-control" id="designation" placeholder="Designation" name="Designation"
          value={designation}
          onChange={(e)=>setDesignation(e.target.value)}
          ></input>
          
        </div>
        <Button variant="primary" onClick={handlerClick}>Enregistrer</Button>
      </form>

     )
}

export default AjoutModele;