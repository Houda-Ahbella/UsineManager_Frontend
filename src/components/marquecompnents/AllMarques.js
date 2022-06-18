import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
import { Button , Modal  ,  Card} from 'react-bootstrap';
import {Tooltip} from "@material-ui/core"
import AjoutMarque from "./AjoutMarque";
import OneMarque from "./OneMarque";
import 'bootstrap-icons/font/bootstrap-icons.css';
import RoleNavbar from "../Acceuil/Navbar"
import MenuOption from "../MenuOption";

class App extends React.Component {
  constructor(props)
  {
    super(props);
    
    this.MakeModalVisible=this.MakeModalVisible.bind(this);
    this.MakeEditModalVisible=this.MakeEditModalVisible.bind(this);
    this.state = {
      marques: []
     , redirection : false
     , visible : false
     , EditModal : false
     ,utilisateur : {}
    };
  }
  async componentDidMount() {
    const response = await fetch('http://localhost:9090/Usine/allmarques');
    const body = await response.json();
    const queryParmater= new URLSearchParams(window.location.search);
    const mbr=queryParmater.get('m');
    if(mbr===-1)
    {
      window.location.assign("/Acceuil")
    }
    const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
    const body2 = await response2.json();
    this.setState({marques: body, utilisateur: body2});
  }

  MakeEditModalVisible()
  {
  
    if(this.state.EditModal===false)
       this.setState({EditModal : true})
    else  this.setState({EditModal : false})
   
  }
  MakeModalVisible()
  { 
    if(this.state.visible===false)
               this.setState({visible : true})
    else  this.setState({visible : false})
    
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
        <h1 class="h2">Gestion des Marques</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
            <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
            </div>
          </div>
        </div>
      </div>
     
          <div class="col-md-12 text-right">       
          <button onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp; Ajouter
           </button>       
             
          </div>
          
            <h2 >Marques:</h2>
            
            <div class="container">
                <div class="card-deck">
                 <div class="row row-cols-3">
              {this.state.marques.map(marque =>
               <div class="col">
                <OneMarque marque={marque} id={this.state.utilisateur.id}/> 
                </div>                
              )}
              </div> </div> </div> 
                  
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Ajout d'une nouvelle marque
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AjoutMarque></AjoutMarque>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
            </main>
        </div>
      </div>
        </>
    );
  }
}
export default App;
