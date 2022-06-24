import React from "react"
import TextField  from '@material-ui/core/TextField'
import "../e.css"
import PropTypes from 'prop-types';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MenuOption from "../MenuOption";
import RoleNavbar from "../Acceuil/Navbar"
import {useTheme}  from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableHead } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import OneU from "./OneUtilisateur"
import {Button , Modal } from "react-bootstrap"
import AjoutU from "./AjoutU";


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Suivant"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Précédent"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  
  
  
   
 function Matableutilisateur({rows,m}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <>
      <TableContainer component={Paper}>
        <Table  aria-label="collapsible table" className="table  table-bordered" >
        <TableHead style={{ background: 'rgb(158 158 158)' }} >
            <TableRow>
              <TableCell >Nom</TableCell>
              <TableCell>Prenom</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              
               
                 <OneU row={row} m={m}></OneU>
                
                        
              
            ))}
  
            
  
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {'aria-label': 'lignes par page',}, native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
        
        
          
       
        
    
    </>
    );
  }
  


class AllUtilisateur extends React.Component {
    constructor(props)
    {
      super(props);
      
      this.state = {
        all : []
       ,utilisateur : {}
       ,Ajout : false
       ,NomRecherche : ""
      };
      this.showAjouter = this.showAjouter.bind(this);
      this.Rechercher = this.Rechercher.bind(this);
      this.Refrech = this.Refrech.bind(this);
    }
    async componentDidMount() {

        const queryParmater= new URLSearchParams(window.location.search);
         const response = await fetch('http://localhost:9090/Usine/Allutilisateur');
         const body = await response.json();
         const mbr=queryParmater.get('m');
         const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyid/'+mbr);
         const body2 = await response2.json();
         this.setState({all: body,utilisateur:body2});
         
       }
       showAjouter(){ this.setState({Ajout : !this.state.Ajout})}
       async Refrech()
       {
        const response = await fetch('http://localhost:9090/Usine/Allutilisateur');
        const body = await response.json();
        this.setState({all: body});

       }
       async Rechercher()
       {
        console.log(this.state.NomRecherche);
        const response2 = await fetch('http://localhost:9090/Usine/findUtilisateurbyNom/'+this.state.NomRecherche);
        const body2 = await response2.json();
        if(body2[0].id==-1)
        {
            alert("utilisateur non trouvé");
        }
        else
        {
            this.setState({all:body2});
            console.log(this.state.all);
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
                <RoleNavbar roles={this.state.utilisateur.roles} id={this.state.utilisateur.id}
                 len={this.state.utilisateur.count}></RoleNavbar>
                 <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Gestion des utilisateurs</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                        <MenuOption utilisateur= {this.state.utilisateur}></MenuOption>
                        </div>
                        </div>
                    </div>
                    <br></br>
                    <div >
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <button  class="btn btn-sm btn-outline-primary" data-toggle="modal"
             onClick={this.showAjouter}>
                      <i class="bi bi-plus-circle"></i>&nbsp;&nbsp;Ajouter&nbsp;
           </button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic" label="Nom" variant="standard" 
                onChange={(e)=>this.setState({NomRecherche : e.target.value})}/>
                      <button class="btnR">
                        <i class="bi bi-search" onClick={this.Rechercher}></i>
                      </button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <Button onClick={this.Refrech} variant="outline-primary">Tous</Button>
             </div>
             
             <Matableutilisateur rows={this.state.all} m={this.state.utilisateur.id}></Matableutilisateur>
                </main>
            </div>
            </div>
            <Modal show={this.state.Ajout} onHide={this.showAjouter}>
                <Modal.Body >
                    <AjoutU utlisateurId={this.state.utilisateur.id}></AjoutU>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.showAjouter} >  Fermer  </Button>
                </Modal.Footer>
                    
               
            </Modal>
        </>
        
        )

    }

}
export default AllUtilisateur;