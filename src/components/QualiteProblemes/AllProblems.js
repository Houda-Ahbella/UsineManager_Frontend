import React from "react"
import {Button , Modal } from "react-bootstrap"
import AjoutPrb from "./AjoutPrb"
import OnePrb from "./OnePrb";
import RoleNavbar from "../Acceuil/Navbar"
import MenuOption from "../MenuOption";
class Allprb extends React.Component {


    constructor(props)
    {
      super(props);
      
      this.state = {
        prbs: [] ,
        designation : ""
        ,show : false
        , utilisateur : {}
      };
   
      this.MakeModalVisible=this.MakeModalVisible.bind(this);
     
    }
   async componentDidMount() {
     const response = await fetch('http://localhost:9090/Usine/allProblemes');
     const body = await response.json();
     const queryParmater= new URLSearchParams(window.location.search);
    const mbr=queryParmater.get('m');
    if(mbr===-1)
    {
      window.location.assign("/Acceuil")
    }
    const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
    const body2 = await response2.json();
     this.setState({prbs: body, utilisateur: body2});
    
   }

   MakeModalVisible()
   {
       if(this.state.show==true) this.setState({show:false})
       else this.setState({show:true}) 
   }
 
   render() {
    
 
     return (
 <>
   <title>Vehicules</title>
   <meta charset="utf-8"/>
   <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
        <h1 class="h2">gestion des problémes de qualité</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
          <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-right">
            <button type="button" class="btn btn-sm btn-outline-primary" onClick={this.MakeModalVisible} >
                      <i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Ajouter&nbsp;
                      
            </button>
      </div>
             <h2> Problémes de qualité : </h2>
             
             
              <div className="BtnAjout">
                     
              </div>
         
            
            <Modal show={this.state.show} onHide={this.MakeModalVisible}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ajouter un probléme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <AjoutPrb di={this.state.utilisateur.id}></AjoutPrb>
               </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.MakeModalVisible}> fermer </Button>           
                </Modal.Footer>
            </Modal>
            
             <table className="table table-hover table-bordered">
               <thead style={{ background: 'rgb(158 158 158)' }} >
               <tr>
                  <th>Designation</th> 
                  <th>Actions</th>   
              </tr>
               </thead>
               <tbody>
                     {this.state.prbs.map(prb =>
                       <OnePrb thePrb={prb}></OnePrb>
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
export default Allprb;



