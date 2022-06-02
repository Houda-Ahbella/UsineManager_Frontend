import React from "react"
import {Button , Modal } from "react-bootstrap"
import OneModele from "../ModeleComponents/OneModele"
import AjoutModele from "./AjoutModele"
import {Tooltip} from "@material-ui/core"

class Marque extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        modeles: []
       , marque : String
       , m : Number
       , visible : false
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
     console.log(body)
     this.setState({modeles: body});
     this.setState({marque:des});
     this.setState({m:mbr})
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
  <nav id="sidebarMenu" class="nav col-md-3 col-lg-2 d-md-block bg-light sidebar collapse navbar-fixed-top">
      <div class="position-fixed pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <span data-feather="home" class="align-text-bottom"></span>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file" class="align-text-bottom"></span>
              Orders
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="shopping-cart" class="align-text-bottom"></span>
              Products
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="users" class="align-text-bottom"></span>
              Customers
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="bar-chart-2" class="align-text-bottom"></span>
              Reports
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="layers" class="align-text-bottom"></span>
              Integrations
            </a>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Saved reports</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle" class="align-text-bottom"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text" class="align-text-bottom"></span>
              Current month
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text" class="align-text-bottom"></span>
              Last quarter
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text" class="align-text-bottom"></span>
              Social engagement
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text" class="align-text-bottom"></span>
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Gestion des Marques</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
        <Tooltip title="Nouveau Modele">
          <div class="btn-group me-2">       
          <button onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp; Ajouter
           </button>       
             
          </div>
          </Tooltip>
        </div>
      </div>
             <h2>Les modéles de marque {this.state.marque} :</h2>
            
                
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Ajout d'un nouveau modele
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AjoutModele theMarque={this.state.m}></AjoutModele>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
           
           
            <table className="table table-hover table-bordered">
               <thead style={{ background: 'rgb(158 158 158)' }}>
               <tr>
                  <th>Designation</th>
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



