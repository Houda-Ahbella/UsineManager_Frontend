import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { Card } from 'react-bootstrap';
import "../e.css"

   
   


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function Diagrammevehi({theVehiculesdata}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    
  );
 
  return (
    <>
    <PieChart width={1000} height={300}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={theVehiculesdata}
        cx={200}
        cy={140}
        innerRadius={60}
        outerRadius={80}
        fill="#0400ff"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
      
    </PieChart>
    
    </>
  );
}
export default function DiagrammeVeh({theVehiculesdata}) 
{
    let total=theVehiculesdata[0].value+theVehiculesdata[1].value+theVehiculesdata[2].value;
  return(
<>
<div class="card" >
<div class="tetecard">
<div class="card-header">
    <center><h7>Production des Véhicules</h7></center>
  </div>
</div>
  <div class="row row-cols-2">
    <div class="col">
      <div class="card">
          <div class="row row-cols-1">
              <div class="col">
                  <Card >
                    <Card.Body>
                      <Diagrammevehi theVehiculesdata = {theVehiculesdata}></Diagrammevehi>
                    </Card.Body>
                  </Card>
                </div>
              </div>
        </div>
      </div>
      <div class="col">
        <br></br><br></br>
        <div class="card-deck">
            <div class="row row-cols-2">
              <div class="col">
                  <Card>
                    <Card.Header style={{ background: 'rgb(3 169 244 / 44%)' }}>
                      <i class="bi bi-truck"></i> Tolal 
                    </Card.Header>
                    <Card.Body>  {total} </Card.Body>
                  </Card>
                  </div>
                <div class="col">
                  <Card>
                      <Card.Header style={{ background: '#8BC34A' }}>
                      <i class="bi bi-check-circle"></i>  livrés
                      </Card.Header>
                      <Card.Body>
                          {theVehiculesdata[0].value}
                      </Card.Body>
                  </Card>
                  </div>
                  <div class="col">
                  <Card>
                  <Card.Header class="bloque"   style={{ background:  'rgb(255 124 124)'}}>
                  <i class="bi bi-x-circle"></i>   bloqués
                    </Card.Header>
                      <Card.Body>
                      {theVehiculesdata[1].value}
                      </Card.Body>
                  </Card>
                  </div>
                  <div class="col">
                  <Card >
                      
                  <Card.Header style={{ background:  ' #96969670'}}>
                  <i class="bi bi-arrow-clockwise"></i>   en cours 
                      </Card.Header>
                      <Card.Body>
                          {theVehiculesdata[2].value}
                      </Card.Body>
                  </Card>
                  </div>
              </div>
            </div>
      </div>
  </div>
</div>
</>
  )
   

}