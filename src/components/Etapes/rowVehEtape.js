import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from '@material-ui/core';
import OneEtape from './OnEtapeOfVehicule'
import { useState} from 'react';


export default function RowVehEtape({row}) {
  
   
    const [Open, setOpen] = useState(false);
    
   
   
     function etapesfini()
    {
      

         setOpen(!Open);
    }
    
  
    return (
      
      <React.Fragment>
        <TableRow >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={etapesfini}>
              {Open ? <i class="bi bi-bar-chart-steps"></i> : 
                <Tooltip title="Etapes">
                   <IconButton ><i class="bi bi-bar-chart-steps"></i></IconButton>
                </Tooltip>}
            </IconButton>
          </TableCell>
          <TableCell >{row.ordre}</TableCell>
          <TableCell >{row.num_Chassis}</TableCell>
        </TableRow>
        <TableRow style={{ background: 'rgb(224 224 224 / 57%)' }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={Open} timeout="auto" unmountOnExit>
            <OneEtape  role="1"  all={row.steps} num={row.num_Chassis}></OneEtape>  
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
           
      
    );
  }