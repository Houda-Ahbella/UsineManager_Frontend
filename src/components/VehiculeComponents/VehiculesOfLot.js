import React from "react"
import {Button , Modal  ,OverlayTrigger,Tooltip} from "react-bootstrap"
import OneVehicule from "./OneVehicule";
import AjoutVehicule from "./AjouVehicule"
import {Link} from "react-router-dom"
import TextField  from '@material-ui/core/TextField'
class VLot extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        vehicules: []
       , lot : Number
       , visible : false
       , Recherche : false
      };

      this.RechercheVehicule = this.RechercheVehicule.bind(this);
      this.MakeModalVisible = this.MakeModalVisible.bind(this);
     
    }

    MakeModalVisible()
    { 
      if(this.state.visible===false)
                 this.setState({visible : true})
      else  this.setState({visible : false})
   
    }
    async RechercheVehicule()
    {
      const response = await fetch('http://localhost:9090/Usine/findvehicule/'+ this.state.Recherche);
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
        this.setState({vehicules: body});
      }
      
    }
   async componentDidMount() {

    const queryParmater= new URLSearchParams(window.location.search);
    const lo=queryParmater.get('lot');
     const response = await fetch('http://localhost:9090/Usine/allvehiculesOfLot/'+lo);
     const body = await response.json();
     console.log(body)
     this.setState({vehicules: body});
     this.setState({lot:lo});
   }
 
   render() {
    
 
     return (
 <html lang="en">
 <head>
   <title>Vehicules</title>
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
             <h2> Lot N: {this.state.lot} </h2>
             </center>
             <div class= "SearchForm">
                <TextField id="standard-basic" label="Num Chassis" variant="standard" 
                onChange={(e)=>this.setState({Recherche:e.target.value})} />
                <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Rechercher Vehicule
                        </Tooltip>
                    }>
                      <Button onClick={this.RechercheVehicule} variant="outline-primary"><i class="bi bi-search"></i></Button>
                 </OverlayTrigger>
             </div>
             <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Ajouter Nouveau vehicule
                        </Tooltip>
                    }>
                    <div className="BtnAjout">
                      <Button onClick={this.MakeModalVisible} variant="outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp;Ajouter</Button>
                    </div>
            </OverlayTrigger>
            <a href="/AllLot" >
               <Button variant="outline-primary" className="btnRetourMarque" >
                  <i class="bi bi-backspace"></i>&nbsp; Retour
                 </Button>
            </a>
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ajouter une vehicules
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <AjoutVehicule theLot={this.state.lot}></AjoutVehicule>    
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
             <br></br><br></br><br></br><br></br><br></br>
             <div class="TableVehicule">
             <table className="table table-hover table-bordered">
               <thead style={{ background: 'rgb(224 224 224 / 57%)' }} >
               <tr>
                  <th>Numero</th>
                  <th>Numero de chassis</th>
                  <th>Engine </th>
                  <th>Couleur</th>
                  <th>Modele</th>
                  <th>Marque</th>
                  <th>Actions</th>
              </tr>
               </thead>
               <tbody>
                     {this.state.vehicules.map(vehicule =>
                       <tr>
                         <OneVehicule theVehicule={vehicule}></OneVehicule>
                       </tr>

               )}
                </tbody>
             </table>
             </div>
             <Modal show={this.state.ErrorRecherche} onHide={this.MakeModalVisible}>
                <Modal.Header >
                    <Modal.Title>
                        Vehicule Recherché n'existe pas 
                    </Modal.Title>
                </Modal.Header>
            </Modal>
         </body>
         </html>
     );
   }
 

}
export default VLot;



