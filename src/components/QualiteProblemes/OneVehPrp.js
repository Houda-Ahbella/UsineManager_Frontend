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
import OneEtape  from '../Etapes/OnEtapeOfVehicule';
import Tooltip from '@material-ui/core/Tooltip'
import { Modal,Button } from 'react-bootstrap';
import { useState} from 'react';
import PrbsOfVehicule from './ProblemsOfvehicule';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
export default function OneVehPrb({theVehicule}) {
  

    const [Open, setOpen] = useState(false);
    const[problem , setproblem ] = useState(false)
 
    const classes = useRowStyles();
    return (
      <>
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!Open)}>
              {Open ? <i class="bi bi-bar-chart-steps"></i> : 
               <Tooltip title="Etapes">
               <IconButton ><i class="bi bi-bar-chart-steps"></i></IconButton>
               </Tooltip>
              }
            </IconButton>
            <IconButton aria-label="expand row" size="small" onClick={() => setproblem(!problem)}>
              {problem ? 
                  <i class="bi bi-shield-exclamation"></i> :
                  <Tooltip title="Problémes">
                   <IconButton ><i class="bi bi-shield-fill-exclamation"></i></IconButton>
                </Tooltip>
                
                }
            </IconButton>
          </TableCell>
          <TableCell >{theVehicule.ordre}</TableCell>
          <TableCell >{theVehicule.num_Chassis}</TableCell>  
        </TableRow>
        <TableRow style={{ background: 'rgb(224 224 224 / 57%)' }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={Open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Les Etapes
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow >
                      <TableCell>Nom d'étape</TableCell>
                      <TableCell>Date Fin</TableCell>
                      <TableCell>Etat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {theVehicule.steps.map((step) => (
                    <OneEtape step={step}></OneEtape>     
                        ))}
                          
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <TableRow style={{ background: 'rgb(224 224 224 / 57%)' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={problem} timeout="auto" unmountOnExit>
                <PrbsOfVehicule prbs={theVehicule.problemes} Numchassis={theVehicule.num_Chassis} Lot={theVehicule.lot.num_lot} ></PrbsOfVehicule>
        </Collapse>
        </TableCell>
      </TableRow>
       </React.Fragment>

       </>
    );
  }