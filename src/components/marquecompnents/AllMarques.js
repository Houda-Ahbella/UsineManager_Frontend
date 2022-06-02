import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
import { Button , Modal  ,  Card} from 'react-bootstrap';
import {Tooltip} from "@material-ui/core"
import AjoutMarque from "./AjoutMarque";
import OneMarque from "./OneMarque";
import 'bootstrap-icons/font/bootstrap-icons.css';
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
    };
  }
  async componentDidMount() {
    const response = await fetch('http://localhost:9090/Usine/allmarques');
    const body = await response.json();
    console.log(body)
    this.setState({marques: body});
  }

  MakeEditModalVisible()
  {
   console.log("i m here") 
    if(this.state.EditModal===false)
       this.setState({EditModal : true})
    else  this.setState({EditModal : false})
    console.log(this.state.EditModal)
  }
  MakeModalVisible()
  { console.log(this.state.visible)
    if(this.state.visible===false)
               this.setState({visible : true})
    else  this.setState({visible : false})
    console.log(this.state.visible)
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
        <Tooltip title="Nouvelle Marque">
          <div class="btn-group me-2">       
          <button onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp; Ajouter
           </button>       
             
          </div>
          </Tooltip>
        </div>
      </div>
            <h2 >Marques:</h2>
            
            <div class="container">
                <div class="card-deck">
                 <div class="row row-cols-3">
              {this.state.marques.map(marque =>
               <div class="col">
                <OneMarque marque={marque} /> 
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
