import './App.css';
import React from "react"
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AllMarques from "./components/marquecompnents/AllMarques"
import Appbar from './components/Appbar';
import Marque from './components/ModeleComponents/ModelesOfMarque';
import AllLot from './components/LotComponenets/AllLot';
import VehiculesofLot from './components/VehiculeComponents/VehiculesOfLot'

function App() {
  return (
    <>   
<Appbar></Appbar>     
 <Router>
   <Routes>
     <Route exact path="/allmarques"  element={<AllMarques/>} />
     <Route exact path="/marque"  element={<Marque/>} />
     <Route exact path="/AllLot"  element={<AllLot/>} />
     <Route exact path="/VehiculesOfLot"  element={<VehiculesofLot/>} />
   </Routes>
 </Router>
 </>

  );
}

export default App;

