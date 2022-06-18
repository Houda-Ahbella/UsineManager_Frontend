import './App.css';
import React from "react"
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AllMarques from "./components/marquecompnents/AllMarques"
import Appbar from './components/Appbar';
import Marque from './components/ModeleComponents/ModelesOfMarque';
import AllLot from './components/LotComponenets/AllLot';
import VehiculesofLot from './components/VehiculeComponents/VehiculesOfLot'
import Etapes from './components/Etapes/EtapesOfMarque';
import ExcelToJson from './components/Excel'
import EtapesforVehicule from './components/Etapes/EtapesOfVehicules';
import Allprb from './components/QualiteProblemes/AllProblems';
import SuiviProblemes from './components/QualiteProblemes/SuiviProblemes'
import AcceuilPage from "./components/Acceuil/Acceuil"
import AllUtilisateur from './components/Utilisateur/AllUtilisateur';


function App() {
  return (
    <>   
<Appbar></Appbar>    
 <Router>
   <Routes>
    <Route exact path="/Acceuil"  element={<AcceuilPage/>} />
     <Route exact path="/allmarques"  element={<AllMarques/>} />
     <Route exact path="/marque"  element={<Marque/>} />
     <Route exact path="/etapes"  element={<Etapes/>} />
     <Route exact path="/AllLot"  element={<AllLot/>} />
     <Route exact path="/VehiculesOfLot"  element={<VehiculesofLot/>} />
     <Route exact path='/excel' element={<ExcelToJson/>} />
     <Route exact path='/EtapesOfvehicules' element={<EtapesforVehicule></EtapesforVehicule>}></Route>
     <Route exact path='/Allproblemes' element={<Allprb></Allprb>}></Route>
     <Route exact path='/SuiviProblemes' element={<SuiviProblemes></SuiviProblemes>}></Route>
     <Route exact path='/Allutilisateurs' element={<AllUtilisateur></AllUtilisateur>}></Route>
   </Routes>
 </Router>
 </>

  );
}

export default App;


