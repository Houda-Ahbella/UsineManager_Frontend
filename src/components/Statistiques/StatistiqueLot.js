/*
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import "../e.css"
import { Card } from 'react-bootstrap';
import { Title } from '@material-ui/icons';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export default function CardStatistique({theVehicules}) {
 
   let bloque=0;
   let livree=0;
   let encours=0;
   const dataDoughnut= {
    labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774"
        ]
      }
    ]
  }
   const [problems,setproblems]=  React.useState([])
   for(let i=0 ; i<theVehicules.length ; i++)
   {  let a = theVehicules[i];
      
      for(let j=0; j<a.steps.length;j++)
      {   
          if(a.steps[j].etat=="Bloqué"){ bloque++ ;  break; }
          else if(a.steps[j].nomStep=='LIVRAISON')
          { 
            if(a.steps[j].etat=="Fini") livree++ ;  break ;
          }
         else{}
       
      }
      
    
      
   }
   encours = theVehicules.length-(bloque+livree);
   React.useEffect(()=>
   {
     async function recupe()
     {
     const response = await fetch('http://localhost:9090/Usine/allProblemes');
     const body = await response.json();
     setproblems(body);
      }
     recupe();
   }
   )
   
  return (
      <>
        <div class="card Donne">
          <div class="card">
            <h3>  Vehicules</h3>
              <div class="row row-cols-4">
                 <div class="col">
                    <Card>
                         <Card.Header style={{ background: 'rgb(4 0 255 / 23%)' }}>
                         <i class="bi bi-truck"></i> Tolal 
                         </Card.Header>
                         <Card.Body>
                             {theVehicules.length}
                         </Card.Body>
                     </Card>
                     </div>
                   <div class="col">
                     <Card>
                         <Card.Header style={{ background: '#8BC34A' }}>
                         <i class="bi bi-check-circle"></i>  livrés
                         </Card.Header>
                         <Card.Body>
                             {livree}
                         </Card.Body>
                     </Card>
                    </div>
                    <div class="col">
                     <Card>
                     <Card.Header class="bloque"   style={{ background:  'rgb(244 54 54 / 69%)'}}>
                     <i class="bi bi-x-circle"></i>   bloqués
                      </Card.Header>
                         <Card.Body>
                         {bloque}
                         </Card.Body>
                     </Card>
                     </div>
                     <div class="col">
                     <Card >
                         
                     <Card.Header style={{ background:  ' lightcyan'}}>
                     <i class="bi bi-arrow-clockwise"></i>   en cours 
                         </Card.Header>
                         <Card.Body>
                            {encours}
                         </Card.Body>
                     </Card>
                     </div>
                </div>
              </div>
              <div class="card">
                  <h3>Problémes de qualité</h3>
              <div class="row row-cols-4">
                 
                   { problems.map((pr) => (
                     <div class="col">
                    <Card>
                    <Card.Header style={{ background: 'rgb(4 0 255 / 23%)' }}>
                    <i class="bi bi-truck"></i>  {pr.designation} 
                    </Card.Header>
                    <Card.Body>
                        {pr.count}
                    </Card.Body>
                    </Card>
                    </div>
                    ))}
                    
                     
                   
                     
                </div>
              </div>
           </div>
        
        
</>
  );
}
*/
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class CardStatistique extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}


