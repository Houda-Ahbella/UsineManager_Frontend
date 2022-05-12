import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
import { Button , Modal , OverlayTrigger ,Tooltip } from 'react-bootstrap';
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
  
  
  async componentDidMount() {
    const response = await fetch('http://localhost:9090/Usine/allmarques');
    const body = await response.json();
    console.log(body)
    this.setState({marques: body});
  }

  render() {
  

    return (
<>
<head>
  <title>Marques</title>
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
            <br></br>
            <br></br>
            <h2 >Marques:</h2>
            </center>
            <br></br><br></br><br></br>
            <div class="container">
                <div class="card-deck">
                 <div class="row row-cols-3">
              {this.state.marques.map(marque =>
               <div class="col">
                <OneMarque marque={marque} /> 
                </div>                
              )}
              </div> </div> </div> 
                  <OverlayTrigger overlay={
                        <Tooltip id={`tooltip-top`}>
                            Ajouter Nouvelle Marque
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

        </body>
        </>
    );
  }
}
export default App;
