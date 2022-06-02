
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box"
import CardStatistique from './Statistiques/StatistiqueLot'
import MenuOption from './MenuOption';
import './e.css'
import SuiviProblemes from './QualiteProblemes/SuiviProblemes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,  

    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    color : '#007bff'
  },

}));

function Appbar() {
  const classes = useStyles();

  return (
    <>
  <header class="navbar navbar-light  sticky-top  flex-md-nowrap p-0 shadow" style={{ background: 'rgb(158 158 158)' }} >
  <span >
   <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Logo_Auto_Hall.jpg" width="80" height="40" class="me-3" alt="Bootstrap"/>
  <label style={{ color: '#ffff' , fontSize:"20px"}} > Usine Auto Hall </label>
  </span>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
 
  <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="#"><MenuOption></MenuOption></a>
    </div>
  </div>
</header>

   </>
  );
}
export default Appbar;



/*
import React from 'react'
  import {  Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
  import 'bootstrap/dist/css/bootstrap.css'

class Appbar extends React.Component{

    render(){
        return(
            <div className='App'>
                
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/about-us">Contact Us</Nav.Link>
                                    <Nav.Link href="/contact-us">About Us</Nav.Link>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                    <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                  
            </div>
        )  
    }
}

export default Appbar;
*/