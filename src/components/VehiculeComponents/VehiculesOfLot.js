import React from "react"
import {Button , Modal } from "react-bootstrap"
import OneVehicule from "./OneVehicule";
import AjoutVehicule from "./AjouVehicule"
import TextField  from '@material-ui/core/TextField'
import "../e.css"
import {MatableVehiculesOflot} from "../QualiteProblemes/TableSuivipro"
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar"
class VLot extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        vehicules: []
       , lot : Number
       , visible : false
       , Recherche : false
       ,utilisateur : {}
       ,aide : false
      };

      this.RechercheVehicule = this.RechercheVehicule.bind(this);
      this.MakeModalVisible = this.MakeModalVisible.bind(this);
      this.Tous = this.Tous.bind(this);
     
    }
   

    MakeModalVisible()
    { 
      if(this.state.visible===false)
                 this.setState({visible : true})
      else  this.setState({visible : false})
   
    }
    async RechercheVehicule()
    {
      const trouve = [];
        for(let i = 0 ; i<this.state.vehicules.length; i++)
        {
          if(this.state.Recherche===this.state.vehicules[i].num_Chassis)
          {
            trouve.push(this.state.vehicules[i])
          }
        }
        if(trouve.length===0)
        {
          alert("vehicule n'existe pas !!")
        }
        else
        {
          this.setState({vehicules : trouve})
        }
      
    }
    async Tous()
    {
      const response = await fetch('http://localhost:9090/Usine/allvehiculesOfLot/'+this.state.lot);
     const body = await response.json();
     this.setState({vehicules: body});

    }
   async componentDidMount() {

    const queryParmater= new URLSearchParams(window.location.search);
    const lo=queryParmater.get('lot');
     const response = await fetch('http://localhost:9090/Usine/allvehiculesOfLot/'+lo);
     const body = await response.json();
     const mbr=queryParmater.get('m');
     if(mbr===-1)
     {
       window.location.assign("/Acceuil")
     }
     const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
     const body2 = await response2.json();
     this.setState({vehicules: body,lot:lo,utilisateur:body2});
     let  role= this.state.utilisateur.roles;
     let n = this.state.utilisateur.count;
     for(let i=0;i<n;i++)
    {   
         if(role[i].key.roleId==2)
         {
             this.setState({aide:true})
             break;
            
         }
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
        <h1 class="h2">Gestion des lots et Vehicules</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
          <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
      </div>
      
     
       
      <h2> Lot N: {this.state.lot} </h2>
             <div >
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <button onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Ajouter&nbsp;
           </button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic" label="Num Chassis" variant="standard" 
                onChange={(e)=>this.setState({Recherche:e.target.value})} />
                      <button onClick={this.RechercheVehicule} class="btnR">
                        <i class="bi bi-search"></i>
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button onClick={this.Tous} >Tous</Button>
             </div>
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ajouter une vehicules
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <AjoutVehicule theLot={this.state.lot} id={this.state.utilisateur.id}></AjoutVehicule>    
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
          
             <br></br>
             <MatableVehiculesOflot rows={this.state.vehicules} aide={this.state.aide} id={this.state.utilisateur.id}></MatableVehiculesOflot>
           
            </main>
      </div>
    </div>
         </>
     );
   }
 

}
export default VLot;



