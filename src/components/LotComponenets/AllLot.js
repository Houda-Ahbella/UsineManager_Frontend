import React from "react"
import { Button , Modal  ,OverlayTrigger,Tooltip } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField'
import OneLot from "./OneLot"
import AjoutLot from "./AjoutLot";
import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
class AllLot extends React.Component {
  constructor(props)
  {
    super(props);
    this.MakeModalVisible=this.MakeModalVisible.bind(this);
    this.MakeEditModalVisible=this.MakeEditModalVisible.bind(this);
  
    this.RechercheLot=this.RechercheLot.bind(this);
    
    this.state = {
      lots: []    // pour les lots à afficher
     , redirection : false // pour la redirection
     , visible : false   // pour les visibilité des modals 
     , Recherche : ""
     , ErrorRecherche : false
    
    };
  }
  async RechercheLot()
  {
        
    const response = await fetch('http://localhost:9090/Usine/findlot/'+ this.state.Recherche);
    const body = await response.json();
    console.log(body)
    if(body.timestamp)
    {
          this.setState({ErrorRecherche:true})
          setTimeout(()=> {
            this.setState({ErrorRecherche:false})
        }, 2000)
    }   
    else 
    {
     
      this.setState({lots: body});
    }
    
       
  
  }
  MakeEditModalVisible()
  {
   
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
 
  
  async componentDidMount() {
    const response = await fetch('http://localhost:9090/Usine/allLot');
    const body = await response.json();
    this.setState({lots: body});
  }

  render() {



    return (
<html lang="en">
<head>
  <title>Principal Lots</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
      <body>
        <nav class="nav nav-tabs nav-fill"  style={{ background: 'rgb(220 220 220 / 15%)' }}>
          <a class="nav-link" href="/allmarques">Marques/Modéles/étapes </a>
          <a class="nav-link active" href="">Lots/Vehicules</a>
          <a class="nav-link" href="">Problémes de qualité</a>
        </nav>
          <center>
            <br></br><br></br>
            <h2>Liste des lots :</h2>
            </center>
            <div class= "SearchForm">
                <TextField id="standard-basic" label="Num Lot" variant="standard" 
                onChange={(e)=>this.setState({Recherche:e.target.value})} />
                <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Rechercher Lot
                        </Tooltip>
                    }>
                     <Button onClick={this.RechercheLot} variant="outline-primary">  <i class="bi bi-search"></i></Button>
            </OverlayTrigger>
                 
             </div>
             <br></br><br></br><br></br><br></br>
             <div class="container" >
                <div class="card-deck" >
                 <div class="row row-cols-3">
                    {this.state.lots.map(lot =>
                      <div class="col">
                          <OneLot theLot={lot}></OneLot> 
                      </div>
                         
              )}
                   
                 </div>
               </div>
            </div>
            <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Ajouter Nouveau lot
                        </Tooltip>
                    }>
                    <div className="BtnAjout">
                      <Button onClick={this.MakeModalVisible} variant="outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp;Ajouter</Button>
                    </div>
            </OverlayTrigger>
           
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header style={{ background: 'rgb(220 220 220 / 15%)' }}>
                    <Modal.Title>
                        Ajouter nouveau lot
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AjoutLot></AjoutLot>
                </Modal.Body>
                <Modal.Footer>              
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.ErrorRecherche} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        lot Recherchée n'existe pas
                    </Modal.Title>
                </Modal.Header>
            </Modal>
            
        </body>
        </html>
    );
  }
}
export default AllLot;
