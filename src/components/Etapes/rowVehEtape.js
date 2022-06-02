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

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
export default function RowVehEtape({row}) {
  

    const [Open, setOpen] = useState(false);
    const classes = useRowStyles();
    return (
      <>
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!Open)}>
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
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {row.steps.map((step) => (
                        
                    <OneEtape step={step} role="1"></OneEtape>  
                    
                    ))}
                      
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
           
       </>
    );
  }