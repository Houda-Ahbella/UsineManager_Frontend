import React from "react"
import {Button , Modal , OverlayTrigger , Tooltip} from "react-bootstrap"
import OneModele from "../ModeleComponents/OneModele"
import AjoutModele from "./AjoutModele"

class Marque extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        modeles: []
       , marque : String
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
    const m=queryParmater.get('m');
     const response = await fetch('http://localhost:9090/Usine/allmodelesOfMarque/'+m);
     const body = await response.json();
     console.log(body)
     this.setState({modeles: body});
     this.setState({marque:m});
   }
 
   render() {
    
 
     return (
 <html lang="en">
 <head>
   <title>Bootstrap Example</title>
   <meta charset="utf-8"/>
   <meta name="viewport" content="width=device-width, initial-scale=1"/>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
 </head>
       <body>
          <nav class="nav nav-tabs nav-fill"  style={{ background: 'rgb(220 220 220 / 15%)' }}>
              <a class="nav-link active" href="">Marques/Modéles/étapes </a>
              <a class="nav-link" href="/AllLot">Lots/Vehicules</a>
              <a class="nav-link" href="">Problémes de qualité</a>
            </nav>
           <center>
             <br></br> <br></br>
             <h2>Les modéles de marque {this.state.marque} :</h2>
             <br></br> <br></br>
             </center>
             <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Ajouter Nouveau modele
                        </Tooltip>
                    }>
                    <div className="BtnAjout">
                      <Button  onClick={this.MakeModalVisible} variant="outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp;Ajouter</Button>	
                    </div>
                  </OverlayTrigger>
            <Modal show={this.state.visible} onHide={this.MakeModalVisible}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }}>
                    <Modal.Title>
                        Ajout d'un nouveau modele
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AjoutModele theMarque={this.state.marque}></AjoutModele>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
            <a href="/allmarques" >
               <Button variant="outline-primary" className="btnRetourMarque" >
                  <i class="bi bi-backspace"></i>&nbsp; Retour
                 </Button>
            </a>
            <div class="TableModele">
            <table className="table table-hover table-bordered">
               <thead class="table-secondary">
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
             </div>
         </body>
         </html>
     );
   }
 

}
export default Marque;



