import React from "react";
import * as XLSX from 'xlsx'
import './e.css'
export default class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
     
    };
    this.handleFile = this.handleFile.bind(this);
   
  }
  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = async(e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 , blankrows: false} );
      let test=1
      let designation ;
      let num_bach ;
      let connaissement ;
      let num_lot ;
     if(data.length<5)
     {
       alert("manque d'informations")
     }
     else
     {
       
     
          for(let i =0 ; i<5; i++)
          {  
                if(data[i][1]==="MODELE") { designation= data[i][2]; }
                else if(data[i][1]==="BATCH NO."){ num_bach = data[i][2]; }
                else if(data[i][1]==="CONNAISSEMENT"){ connaissement = data[i][2];}
                else if(data[i][1]==="N° LOT"){num_lot = data[i][2];}
                else{  }
          }
      
      if(designation===undefined)
      {   
              alert("le nom du modele n'existe pas impossible d'importer le fichier!!");
      }
      else if (num_lot===undefined)
      {
               alert("le numero de lot n'existe pas impossible d'importer le fichier!!");
      }
      else
      {
          let vehicules = [];
          const modele ={designation}
          var today = new Date(),
          date_Entree = today.getDate() + '-' + (today.getMonth() + 1) + '-' +today.getFullYear() ;
          
          const lot = {num_lot,num_bach,connaissement ,date_Entree}
          for(let i=5 ; i<data.length ;i++)
          {
            let ordre = data[i][0]; let num_Chassis=data[i][1]; let numengine=data[i][2];
            let couleur = data[i][3];
            if(num_Chassis===undefined||ordre===undefined||numengine===undefined||couleur===undefined)
            {
              test=0
            }
            else
            {
              const v = {modele, ordre,num_Chassis,numengine,couleur,lot}
              vehicules.push(v);
            }
            
          }
          if(vehicules.length===0)
          {
            alert("impossible d'enregistrer ce lot \n il est vide , il y a pas de vehicule");

          }
          else
          {
              const res = await fetch("http://localhost:9090/Usine/addlot",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(vehicules) });
             const meorga = await res.json();
             console.log(meorga.num_lot)
             if(meorga.num_lot===-1)
             {
              const confirmBox = window.confirm(
                "le lot "+num_lot+" est déjà existe \n vous voulez ajouter ces nouveau informations à ce lot"
              )
              if (confirmBox === true) 
              {
                fetch("http://localhost:9090/Usine/addExisteLot",{
                  method:"POST",
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify(vehicules)
                  })
                    if(test===0) alert("certain ligne sont vide ou mal écrit \n ils sont pas enregistrée !")
                    window.location.assign("/AllLot")
                  
              }
             }
             else if(meorga.num_lot===0)
             {
               alert("enregistrement echouée \n les vehicules déjà entregistrée")
               
             }
             else
             {
               if(test===0) alert("certain ligne sont vide ou mal écrit \n ils sont pas enregistrée !")
               window.location.assign("/AllLot");
             }
          }

      }
     }
      
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }
 
  render() {
    return (
      <form>
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
      </DragDropFile>
    
    </form>
    );
  }
}


class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
    showE : ""
    }
  }
  handleChange(e) {
    this.setState({showE:"Enregistrement en cours"})
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <>
      <form className="form-inline">
      <p class="encours">  {this.state.showE} </p>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            id="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={this.handleChange}
          />
        </div>
      </form>
     
      </>
    );
  }
}









