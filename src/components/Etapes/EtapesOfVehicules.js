import React from 'react';
import {Button , Modal } from "react-bootstrap"
import TextField  from '@material-ui/core/TextField'
import {MatableSuiEtapes} from '../QualiteProblemes/TableSuivipro'
import '../e.css'
import { Tooltip } from '@material-ui/core';
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar"


   
class EtapesforVehicule extends React.Component {
    constructor(props)
    {
      super(props); 
      this.state = {  
        rows: [] ,
        Recherche : false
        , lot : Number
        , utilisateur : {}
      };
      this.RechercheVehicule = this.RechercheVehicule.bind(this);
    }
    async componentDidMount() 
    {
       const queryParmater= new URLSearchParams(window.location.search);
        const m=queryParmater.get('m');
        this.setState({lot:m})
         const response = await fetch('http://localhost:9090/Usine/allvehiculesOfLot/'+m);
         const body = await response.json();
         const queryParmater2= new URLSearchParams(window.location.search);
        const mbr=queryParmater2.get('n');
        if(mbr===-1)
        {
          window.location.assign("/Acceuil")
        }
        const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
        const body2 = await response2.json();
    
         this.setState({rows : body,utilisateur : body2})
       }
       async RechercheVehicule()
       {
         const trouve = [];
        for(let i = 0 ; i<this.state.rows.length; i++)
        {
          console.log(this.state.rows[i].num_Chassis+ "   " + this.state.Recherche)
          if(this.state.Recherche===this.state.rows[i].num_Chassis)
          {
           
            trouve.push(this.state.rows[i])
          }
        }
        if(trouve.length===0)
        {
          alert("vehicule n'existe pas !!")
        }
        else
        {
          this.setState({rows : trouve})
        }
        
         
       }
    render() {
  return (
    <>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
<div class="container-fluid">
  <div class="row">
  <RoleNavbar roles={this.state.utilisateur.roles} id={this.state.utilisateur.id}
  len={this.state.utilisateur.count}></RoleNavbar>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Suivi de production</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
          <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
      </div>
     


 

  <h2> Lot N: {this.state.lot} </h2>
            
             
             <div class= "SearchForm">
                <TextField id="standard-basic" label="Num Chassis" variant="standard" 
                 onChange={(e)=>this.setState({Recherche:e.target.value})}
                />
                      <button class="btnR" onClick={this.RechercheVehicule} >
                        <i class="bi bi-search"></i>
                      </button>
             </div>
            
             
            
       <MatableSuiEtapes rows={this.state.rows}></MatableSuiEtapes>
    </main>
    </div>
  </div>
    </>
  );
}
}
export default EtapesforVehicule;



