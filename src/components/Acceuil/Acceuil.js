import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
import * as React from 'react';
import {Slide } from '@material-ui/core';
import { Modal  } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';



  

  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class AcceuilPage extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
        open : false,
         email:"",
         password : ""  
         , go : true
         ,utilisateur : {}
    }
    this.handleClickOpen= this.handleClickOpen.bind(this);
    this.Ajouter = this.Ajouter.bind(this);
  
  }
 
    handleClickOpen () {
      this.setState({open:!this.state.open});
    };
  
    async Ajouter ()
    {
     let email = this.state.email;
     let password = this.state.password;
     let compte = {email,password};
     const response = await fetch("http://localhost:9090/Usine/findUtilisateur",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(compte)
        });
    const u = await response.json();
    if(u.id===-1)
    {
        alert(u.nom)
    }
    else
    {
      for(let i = 0; i<u.count ; i++)
      {
        if(u.roles[i].key.roleId==1||u.roles[i].roleId==2||u.roles[i].roleId==3||u.roles[i].roleId==4)
        {
          window.location.assign("/AllLot?m="+u.id);
        }
        else if(u.roles[i].key.roleId==5)
        {
          window.location.assign("/Allmarques?m="+u.id);
        }
        else if(u.roles[i].key.roleId==6)
        {
          
        }
        else
        {
          
        }
      }
           
    }
    }
 
  render() {
  

    return (
    <>
        <body class="bodym">
        <section id="hero">
            <div class="hero-container" data-aos="zoom-in" data-aos-delay="100">
            <h1>AUTO HALL VEHICULES INDUSTRIELS</h1>
            <h2>Un hériatge de 100 ans d'histoire d'automobile</h2>
            <span  class="btn-get-started" onClick={this.handleClickOpen}>Connecter</span>
            </div>
        </section>
        <Modal show={this.state.open} onHide={this.handleClickOpen}>
              <Modal.Header    >
                  <Modal.Title><center>Connexion</center></Modal.Title>
        </Modal.Header>
       <Modal.Body >
       <div class="card mb-3" >
            <div class="row g-0 d-flex align-items-center">
            <div class="col-lg-8">
                <div class="card-body py-5 px-md-5">
                <form>
                    <h6>Authentifier pour accèder à votre espace</h6>
                    <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Email </label>
                    <input type="email" id="form2Example1" class="form-control"
                     onChange={(e)=>this.setState({email : e.target.value})}  />
                    </div>
                    <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">Mot de passe</label>
                    <input type="password" id="form2Example2" class="form-control"
                    onChange={(e)=>this.setState({password : e.target.value})} />
                    </div>
                    <div class="row mb-4">
                    <div class="col">
                        <a href="#!">Mot de passe oublié?</a>
                    </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block mb-4"
                    onClick={this.Ajouter}>Connecter</button>
                </form>
                </div>
            </div>
            </div>
        </div>
       </Modal.Body>
        </Modal>
        </body>
        
        </>
    );
  }
}


export default  AcceuilPage;