
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box"
import  {Button } from 'react-bootstrap';
import MenuOption from './MenuOption';


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
    <div className={classes.root  + " Appbar"} >
    <Box sx={{ flexGrow: 1 } } >
      <AppBar position="static" style={{ background: 'rgb(220 220 220 / 15%)' } } > 
        <Toolbar >
        &nbsp;&nbsp;&nbsp;
          <IconButton size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/5/55/Logo_Auto_Hall.jpg' alt="not found " height="40" width="70"></img>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Usine Auto Hall 
          </Typography>
          <MenuOption></MenuOption>
        </Toolbar>
      </AppBar>
      </Box>
    </div>
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