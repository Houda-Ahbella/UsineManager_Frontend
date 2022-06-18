import React from "react"
import { Button , Modal  ,OverlayTrigger,Tooltip } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField'
import OneLot from "./OneLot"
import AjoutLot from "./AjoutLot";
import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Collapse from '@material-ui/core/Collapse';
import DiagrammesLot from "../Statistiques/DiagrammesLOT";
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar";

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
     , Title : "Statistiques"
     , OpenStatistique : false
     , utilisateur : {}
     ,aide : false
    };
    this.OpenStatistique= this.OpenStatistique.bind(this);
  }
  OpenStatistique()
    {
      
      this.setState({OpenStatistique:!this.state.OpenStatistique});
      if(this.state.OpenStatistique==true) this.setState({Title: "Statistiques"})
      else  this.setState({Title: "Lots"}) 
      
    }
  async RechercheLot()
  {
     if(this.state.Recherche!="")
     {
      const trouve = [];
      for(let i = 0 ; i<this.state.lots.length; i++)
      {
      
        if(this.state.Recherche==this.state.lots[i].num_lot)
        {
          
          trouve.push(this.state.lots[i])
        }
        else { console.log(this.state.lots[i].num_lot) }
      }
      if(trouve.length===0)
      {
        alert("Lot  n'existe pas !!")
      }
      else
      {
        this.setState({lots : trouve}) 
      }

     }
       
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
 
  
  async componentDidMount() {
    const response = await fetch('http://localhost:9090/Usine/allLot');
    const body = await response.json();
    
    const queryParmater= new URLSearchParams(window.location.search);
    const mbr=queryParmater.get('m');
    if(mbr===-1)
    {
      window.location.assign("/Acceuil")
    }
    const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
    const body2 = await response2.json();
    this.setState({lots: body , utilisateur: body2});
    
    let  role= this.state.utilisateur.roles;
    
     let n = role.length;
    for(let i=0;i<n;i++)
    {   
         if(role[i].key.roleId==2||role[i].key.roleId==1)
         {
             this.setState({aide:true})
             break;
            
         }
    }
    
  }

  render() {

    
   let ordon = this.state.aide;

    return (
<>
<>
  <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/dashboard/"></link>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
</>
<div class="container-fluid">
  <div class="row">
  <RoleNavbar roles={this.state.utilisateur.roles} id={this.state.utilisateur.id}
  len={this.state.utilisateur.count}></RoleNavbar>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Gestion des lots et Vehicules</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
           <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
          </div>
        </div>
        
      </div>
      
      {ordon? (<div class="col-md-12 text-right">
        <button onClick={this.OpenStatistique} class="btn btn-sm btn-outline-primary" 
                data-toggle="modal">
                <i class="bi bi-plus-circle"></i>&nbsp;&nbsp;{this.state.Title}&nbsp;
        </button>
      </div>) : (<></>
           )}
             
      
      <Collapse in={!this.state.OpenStatistique} timeout="auto" unmountOnExit>
      <h2>Liste des lots :</h2>
           
            
             <div>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           {ordon? (<button onClick={this.MakeModalVisible} class="btn btn-sm btn-outline-primary" data-toggle="modal">
                      <i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Ajouter&nbsp;
                 </button>) : (<></>
           )}
             
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic" label="Num Lot" variant="standard" 
                onChange={(e)=>this.setState({Recherche:e.target.value})} />
                     <button class="btnR" onClick={this.RechercheLot} variant="outline-primary">  
                     <i class="bi bi-search"></i></button>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
          
           </div>
             <br></br><br></br>
             <div class="container" >
                <div class="card-deck" >
                 <div class="row row-cols-3">
                    {this.state.lots.map(lot =>
                      <div class="col">

                          <OneLot theLot={lot} role={this.state.utilisateur.roles}
                          id={this.state.utilisateur.id}></OneLot> 
                      </div>
                         
                      )}
                   
                 </div>
               </div>
            </div>
            
          
           
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
      </Collapse>  
      <Collapse in={this.state.OpenStatistique} timeout="auto" unmountOnExit>
      <h2>Statistiques quotidienne :</h2>
        <DiagrammesLot></DiagrammesLot>
      </Collapse> 
      </main>
         
             

           
            
        </div>
        </div>
        </>
    );
  }
}
export default AllLot;
