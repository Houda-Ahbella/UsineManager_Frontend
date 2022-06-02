import React from 'react';
import {Button , Modal } from "react-bootstrap"
import TextField  from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RowVehEtape from './rowVehEtape'
import '../e.css'
import { Tooltip } from '@material-ui/core';



   
class EtapesforVehicule extends React.Component {
    constructor(props)
    {
      super(props); 
      this.state = {  
        rows: [] ,
        Recherche : false
        , lot : Number
      };
      this.RechercheVehicule = this.RechercheVehicule.bind(this);
    }
    async componentDidMount() 
    {
       const queryParmater= new URLSearchParams(window.location.search);
        const m=queryParmater.get('m');
        this.setState({lot:m})
         const response = await fetch('http://localhost:9090/Usine/allvehiculesOfLot/'+m);
         const body = await response.json();
         console.log(body)
         this.setState({rows : body})
       }
       async RechercheVehicule()
       {
         const trouve = [];
        for(let i = 0 ; i<this.state.rows.length; i++)
        {
          if(this.state.Recherche===this.state.rows[i].num_Chassis)
          {
            trouve.push(this.state.rows[i])
          }
        }
        if(trouve.length===0)
        {
          alert("vehicule n'existe pas !!")
        }
        else
        {
          this.setState({rows : trouve})
        }
        
         
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
        <h1 class="h2">Suivi de production</h1>
        
      </div>
 


 

  <h2> Lot N: {this.state.lot} </h2>
             <br></br><br></br>
            
             
             <div class= "SearchForm">
                <TextField id="standard-basic" label="Num Chassis" variant="standard" 
                 onChange={(e)=>this.setState({Recherche:e.target.value})}
                />
                      <button class="btnR" onClick={this.RechercheVehicule} >
                        <i class="bi bi-search"></i>
                      </button>
             </div>
            
             <Tooltip title="Retour au lot">
             <a href="/AllLot" >
             
               <button class="btnA btnRetourMarque"  >
                  <i class="bi bi-backspace"></i>
                 </button>
             
            </a>
            </Tooltip>
            
  
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className="table table-bordered" >
        <TableHead style={{ background: 'rgb(158 158 158)' }} >
          <TableRow>
            <TableCell />
            <TableCell>Num</TableCell>
            <TableCell>Num Chassis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
             
             <RowVehEtape row={row}></RowVehEtape>
           
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </main>
    </div>
  </div>
    </>
  );
}
}
export default EtapesforVehicule;



