import React from 'react';
import {Dropdown } from "react-bootstrap"
import TextField  from '@material-ui/core/TextField'

import CardStatistique from '../Statistiques/StatistiqueLot'
import '../e.css'
import Collapse from '@material-ui/core/Collapse';
import * as XLSX from 'xlsx'
import MatableSuiPro from "./TableSuivipro"
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar";

class SuiviProblemes extends React.Component {
    constructor(props)
    {
      super(props); 
      this.state = {  
        rows: [] ,
        all : [] , 
        Recherche : false
        , Lot : Number
        , OpenStatistique :false
        , Title : "Statistiques"
        , theproblems : []
        , steps : []
        ,l : {},
         modele : "", marque : "",
          utilisateur : {}
      };
      this.RechercheVehicule = this.RechercheVehicule.bind(this);
      this.OpenStatistique=this.OpenStatistique.bind(this);
      this.GetBloques = this.GetBloques.bind(this);
      this.Allvehicules = this.Allvehicules.bind(this);
    }
 
    OpenStatistique()
    {
      this.setState({OpenStatistique:!this.state.OpenStatistique});
      if(this.state.OpenStatistique==true) this.setState({Title: "Statistiques"})
      else  this.setState({Title: "Véhicules"}) 
      
    }
    async componentDidMount() 
    {
        const queryParmater= new URLSearchParams(window.location.search);
        const m=queryParmater.get('m');
        this.setState({Lot : m})
         const response = await fetch('http://localhost:9090/Usine/allvehiculesOfLot/'+m);
         const body = await response.json();
         this.setState({rows : body})
         this.setState({all:body})
         this.setState({steps:body[0].steps})
         this.setState({l:body[0].lot})
         this.setState({modele : body[0].modele.designation})
         const response1 = await fetch('http://localhost:9090/Usine/allProblemesOfLot/'+m);
         const body1 = await response1.json();
         const queryParmater2= new URLSearchParams(window.location.search);
         const mbr=queryParmater2.get('n');
         const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
         const body2 = await response2.json();
         this.setState({theproblems:body1,utilisateur:body2,marque :  body[0].modele.marque.designation})

    }
       async RechercheVehicule()
       {
         const trouve = [];
        for(let i = 0 ; i<this.state.rows.length; i++)
        {
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
       async GetBloques()
       { console.log(this.state.Lot)
         
         const response = await fetch('http://localhost:9090/Usine/allVehiculesbloquéOfLot/'+this.state.Lot);
         const body = await response.json();
         this.setState({rows:body})
         
       }
       async Allvehicules()
       {
         this.setState({rows:this.state.all});
       }
    render() {
  return (
      <>
    
   <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/dashboard/"></link>
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
        <h1 class="h2">Suivi des Problémes de qualité</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
           <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-right">
            <button type="button" class="btn btn-sm btn-outline-primary"
          onClick={this.OpenStatistique}>{this.state.Title}</button>
          </div>
     <h2>Lot Num {this.state.Lot}: </h2>
     
          
       
    <Collapse in={!this.state.OpenStatistique} timeout="auto" unmountOnExit> 
            <ExportCSV  fileName={"numLot"+this.state.Lot}  customers={this.state.rows}></ExportCSV> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Dropdown className="d-inline mx-2" autoClose="inside" >
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" >
                Filtrer
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.Allvehicules}>Tous</Dropdown.Item>
                <Dropdown.Item onClick={this.GetBloques} >Bloqués</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span >
                <TextField id="standard-basic" label="Num Chassis" variant="standard" 
                 onChange={(e)=>this.setState({Recherche:e.target.value})}
                />
                      <button class="btnR" onClick={this.RechercheVehicule} >
                        <i class="bi bi-search"></i>
                      </button>
            </span>
          
            <MatableSuiPro rows={this.state.rows}></MatableSuiPro>        
    </Collapse>
    <Collapse in={this.state.OpenStatistique} timeout="auto" unmountOnExit>
    <CardStatistique theVehicules={this.state.rows} theproblems={this.state.theproblems}></CardStatistique>
    </Collapse>
    <Collapse in={true} timeout="auto" unmountOnExit>
   <table id="table_instance" hidden>
     <thead>
       <tr><td>Num lot </td> <td>{this.state.Lot}</td></tr>
       <tr><td>connaissement </td> <td>{this.state.l.connaissement}</td></tr>
       <tr><td>Num bach </td> <td>{this.state.l.num_bach}</td></tr>
       <tr><td>Date d'entrée</td><td>{this.state.l.date_Entree}</td></tr>
       <tr><td>Modèle</td><td>{this.state.modele}</td></tr>
       <tr><td>Marque</td><td>{this.state.marque}</td></tr>
     
     <tr>
       <td></td><td>chassis</td><td>Engine</td><td>Couleur</td>
       {this.state.steps.map((step) => (
         <td>{step.nomStep}</td>
         ))}
         <td>Problémes</td>
     </tr>
     </thead>
     <tbody>
     {this.state.rows.map((row) => (
         <tr><td>{row.ordre}</td><td>{row.num_Chassis}</td><td>{row.numengine}</td><td>{row.couleur}</td>
         <Step steps={row.steps}></Step>
         <Problemes problemes={row.problemes} ></Problemes>
         </tr>
     ))}
     </tbody>
   </table>
 
   
   </Collapse>
   
    </main>
    </div>
    </div>
  
    
    </>
  );
}
}
export default SuiviProblemes;
const Problemes = ({problemes})=>
{ 
  let nom = "";
  for(let i = 0; i<problemes.length;i++)
  {
    if(problemes[i].observation==="" || problemes[i].observation=== null)
    {
      nom = nom + "+" + problemes[i].nom +"\r";
    }
    else{nom = nom + "+" + problemes[i].nom +"("+ problemes[i].observation +") \r";}
    
  }
    return (
      <td>{nom}</td>
    )
}
const Step = ({steps})=>
{
return(
  <>
   {steps.map((step) => (
         <td>{step.datefin}{"\r"+step.etat}</td>
     ))}
  </>
)
}
const ExportCSV = ({  fileName , customers }) => {
  
 
 
  
  const exportToCSV = () => {
 
    var table_elt = document.getElementById('table_instance');

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt);
    
    // Process Data (add a new row)
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
    
    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "Report.xls");

  };

  return (
    <button
      class="btn  btn-outline-primary" 
      onClick={e => exportToCSV()}
    ><i class="bi bi-folder-symlink-fill"></i>
      Exporter
    </button>
  );
};






