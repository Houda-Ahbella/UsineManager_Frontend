import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import "../e.css"
import { Card } from 'react-bootstrap';
import DiagrammeProbleme from './Diagrammes'
import DiagrammeVeh from './DiagrammesVeh';

let numlot = 0;
export default function CardStatistique({theVehicules,theproblems}) {
  let bloque=0;
  let livree =0;
  let encours=0;
   numlot = theVehicules[0].lot.num_lot;
   for(let i=0 ; i<theVehicules.length ; i++)
   {  let a = theVehicules[i];
      
      for(let j=0; j<a.steps.length;j++)
      {   
         
           if(a.steps[j].nomStep=='LIVRAISON')
          { 
            if(a.steps[j].etat=="Fini") livree++ ;  break ;
          }
          else if(a.steps[j].etat=="Bloqué"){ bloque++ ;  break; }
         else{}
       
      }
      
    
      
   }
   console.log(theproblems)
   encours = theVehicules.length-(bloque+livree);
   
  let theVehiculesdata = []

   let name = 'Livrée'
  let value = livree
  theVehiculesdata.push({name,value})
   name = 'Bloqués'
   value = bloque
   theVehiculesdata.push({name,value})
   name = 'Encous'
   value = encours
   theVehiculesdata.push({name,value})
  return (
      <>
        <div class="card">
            <DiagrammeVeh theVehiculesdata={theVehiculesdata} ></DiagrammeVeh>
            <div class="card">
            <div class="tetecard">
               <div class="card-header">
                <center><h7>Problémes de qualité</h7></center>
               </div>
            </div>
            <div class="row row-cols-2">
              <div class="col">
                  <Card> 
                      <Card.Body>
                            <DiagrammeProbleme thePrbs={theproblems}></DiagrammeProbleme> 
                        </Card.Body>
                  </Card>  
              </div>
              <div class="col">
                <br></br><br></br>
                 <div class="row row-cols-2">
                      { theproblems.map((pr) => (
                        <div class="col">
                        <Card>
                          <div class="tetecard">
                        <Card.Header >
                        <i class="bi bi-truck"></i>  {pr.designation} 
                        </Card.Header>
                        </div>
                        <Card.Body>
                            {pr.count}
                        </Card.Body>
                        </Card>
                        </div>
                        ))}                        
                    </div>
              </div>
            </div>
              
                
              </div>
           </div>
           
          
               
           
           
        
</>
  );
}
