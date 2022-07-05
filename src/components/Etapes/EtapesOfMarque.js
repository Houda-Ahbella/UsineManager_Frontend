import React from "react"
import {Button , Modal , OverlayTrigger , Tooltip} from "react-bootstrap"
import OneEtape from "../Etapes/OneEtape"
import AjoutEtape from "./AjoutEtape";
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar";

class Etapes extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        etapes: []
       , marque : Number
       , marquename: ""
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
     const m=queryParmater.get('m');
     const n = queryParmater.get('n');
     const response = await fetch('http://localhost:9090/Usine/allStepsofmarque/'+n);
     const body = await response.json();
     const mbr=queryParmater.get('id');
     const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
    const body2 = await response2.json();
  
    
     this.setState({etapes: body , marque:n , marquename:m , utilisateur:body2});
     
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
        <h1 class="h2">Gestion des étapes</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">       
            <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-right">
           <button  onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp; Ajouter
           </button> 
      </div>    
             <h2>Les étapes d'assemnlage de la marque {this.state.marquename} :</h2>
             
             
              <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Ajouter une étape
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <AjoutEtape themarque={this.state.marquename} theNumber={this.state.marque} 
                 id={this.state.utilisateur.id}></AjoutEtape>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
            
           
            <table className="table table-hover table-bordered">
               <thead style={{ background: 'rgb(158 158 158)' }}>
               <tr>
                  <th>Designation</th>
                  <th>Ordre</th>
                  <th>actions</th>
              </tr>
               </thead>
               <tbody>
                     {this.state.etapes.map(etape =>
                       <tr>
                         <OneEtape etape={etape} id={this.state.utilisateur.id}></OneEtape>
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
export default Etapes;



