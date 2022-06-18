import React from "react";
import 'bootstrap/dist/css/bootstrap.css'

import {
    Pie , 
    PieChart,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    Tooltip,
    Legend ,
    LineChart,
    Line,
   
    CartesianGrid,
   
    Brush,
    AreaChart,
    Area
  } from "recharts";

  
  

  
let Vehicules = [];


    async function recupeveh()
    {
    const response = await fetch('http://localhost:9090/Usine/StatistiqueQuotidienne');
    const body = await response.json();
     const nams = ["Livrés", "Bloqués", "en cours"];
     const COLORS = ["#96d3e3",  "#6bafc2" ,"#017fb1" , "#01678e", "#015677"];
     let total = 0;
     for(let j=0; j<body.length ; j++)
     {

      total= total + body[j];
     }
     for(let i=0;i<body.length;i++)
       {
         
         let Nombre = body[i];
         let percent = Nombre*100/total;
         let Text = nams[i] + "( " + percent + " %)";
         let color = COLORS[i];
         let a ={Text,Nombre,color}
         Vehicules.push(a);
         
       }
      
   
   }

     recupeveh(); 
   
   






   class Lot extends React.Component {
    render() {
      const { x, y, fill, value } = this.props;
      return (
        <text
          x={x}
          y={y}
          dy={-4}
          fontSize="16"
          fontFamily="sans-serif"
          fill={fill}
          textAnchor="middle"
        >
          {value}
        </text>
      );
    }
  }
  
 
  export default function DiagrammesLot() {
   
   

  
      
    
    return (
      <div className="app">
        <div className="side-text">
          <h6>Production d'aujourdui {new Date().toLocaleDateString()}</h6>
        </div>
        <div className="main">
          <BarChart
            width={900}
            height={400}
            data={Vehicules}
            margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
          >
            
            <Bar
              dataKey="Nombre"
              barSize={170}
              fontFamily="sans-serif"
              label={<Lot />}
            >
              {Vehicules.map((entry, index) => (
                <Cell fill={Vehicules[index].color} />
              ))}
            </Bar>
            <Tooltip   cursor={false}/>
            <XAxis dataKey="Text" fontFamily="sans-serif" tickSize dy="25" />
            <YAxis  />
          </BarChart>
        </div>
        <Statistiqueparmpois></Statistiqueparmpois>
        <PieRechartComponent></PieRechartComponent>
        
      </div>
    );
  }
  let problems = [];
  let total = 0;
  let lista = [];
  async function recupeprbs()
  {
  const response = await fetch('http://localhost:9090/Usine/allProblemes');
  const body = await response.json();
   
   for(let j=0; j<body.length ; j++)
   {
     total= body[j].count + total;
   }
   for(let i=0;i<body.length;i++)
     {
       let name = body[i].designation
       let value = body[i].count*100/total; 
       let a ={name,value}
       problems.push(a);
     }
  lista = body
 }
 recupeprbs();  

  
  
  class PieRechartComponent extends React.Component {
     COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
     CustomTooltip = ({ active, payload, label }) => {
        if (active) {
           return (
           <div
              className="custom-tooltip"
              style={{
                 backgroundColor: "#ffff",
                 padding: "5px",
                 border: "1px solid #cccc"
              }}
           >
              <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
           </div>
        );
     }
     return null;
  };
  render() {
     return (
        <>
    <div className="card">
     <div className="card">
     <div className="side-text">
          <h6>Problémes de qualité</h6>
        </div>
        <PieChart width={730} height={300}>
        <Pie
           data={problems}
           color="#000000"
           dataKey="value"
           nameKey="name"
           cx="50%"
           cy="50%"
           outerRadius={100}
           fill="#8884d8"
        >
           {problems.map((entry, index) => (
              <Cell
                 key={`cell-${index}`}
                 fill={this.COLORS[index % this.COLORS.length]}
              />
           ))}
        </Pie>
        <Tooltip content={<this.CustomTooltip />} />
        <Legend />
        </PieChart>
        </div>
        <div className="card">
        <table class="table table-sm">
            <thead className="table-primary">
              <tr><td>Problémes</td><td>Nombre de Véhicules</td></tr>  
            </thead>

            <tr>
                <td>total</td>
                <td>{total}</td>
            </tr>
           
            {lista.map(pr => 
              <tr>
                  <td>
                      {pr.designation}
                  </td>
                  <td>
                      {pr.count}
                  </td>
              </tr>
              
           )}
             
        </table>
        </div>
        </div>
      
        </>
        );
     }
  }
 
  const data = [
    {name: "Janvier", uv: 0,},
    {name: "Février",uv: 0},
    { name: "Mars",uv: 0 },
    { name: "Avril",uv: 0 },
    { name: "Mai",uv: 0 },
    { name: "Juin", uv: 0, },
    { name: "Juillet",uv: 0, },
    { name: "Aout", uv: 0,},
    { name: "Septembre",uv: 0 },
    { name: "Novembre",uv: 0 },
    { name: "Decembre",uv: 0 },
  ];
  async function statiparmois()
  {
    const response = await fetch('http://localhost:9090/Usine/Statistiqueparmonth');
    const body = await response.json();
    for(let i=0 ; i<body.length; i++)
    {
      data[i].uv=body[i];
    }

  } 
  statiparmois();
  function Statistiqueparmpois() {
    return (
      <div>
        <h6>Developpement de production pour cette année ({new Date().getFullYear()})</h6>
        <LineChart
          width={1000}
          height={400}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
          
      </div>
    );
  }
  