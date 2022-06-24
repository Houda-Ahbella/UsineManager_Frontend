import React from "react"
import {Button , Modal } from "react-bootstrap"
import OneModele from "../ModeleComponents/OneModele"
import AjoutModele from "./AjoutModele"
import {Tooltip} from "@material-ui/core"
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar";

class Marque extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        modeles: []
       , marque : String
       , m : Number
       , visible : false
       , utilisateur : {}
      };

      this.MakeModalVisible = this.MakeModalVisible.bind(this);
     
    }

    MakeModalVisible()
    { 
      if(this.state.visible===false)
                 this.setState({visible : true})
      else  this.setState({visible : false})
   
    }
   async componentDidMount() {

    const queryParmater= new URLSearchParams(window.location.search);
    const mbr=queryParmater.get('m');
    const des = queryParmater.get('des');
     const response = await fetch('http://localhost:9090/Usine/allmodelesOfMarque/'+mbr);
     const body = await response.json();
     const nbr=queryParmater.get('n');
     const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+nbr);
     const body2 = await response2.json();
     this.setState({modeles: body,marque:des,m:mbr,utilisateur:body2});
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
        <h1 class="h2">Gestion des Modèles</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">       
          <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-right">
          <button onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                          <i class="bi bi-plus-circle"></i>&nbsp; Ajouter
              </button>
       </div>            
             <h2>Les modéles de marque {this.state.marque} :</h2>
            
                
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Ajout d'un nouveau modele
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AjoutModele theMarque={this.state.m} id ={this.state.utilisateur.id}></AjoutModele>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
           
           
            <table className="table table-hover table-bordered">
               <thead style={{ background: 'rgb(158 158 158)' }}>
               <tr>
                  <th>Designation</th>
                  <th>Actions</th>
              </tr>
               </thead>
               <tbody>
                     {this.state.modeles.map(modele =>
                       <tr>
                         <OneModele modele={modele} ></OneModele>
                       </tr>

               )}
                </tbody>
             </table>
            </main>
         </div>
         </div>
         </>
     );
   }
 

}
export default Marque;



