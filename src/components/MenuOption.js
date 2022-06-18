import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './e.css'
const StyledMenu = withStyles({
  
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: "#007bff",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const  MenuOption = ({utilisateur})=> {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button class="avatar"
       onClick={handleClick}><i class="bi bi-person"></i>
      </button>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <StyledMenuItem>
          <ListItemText primary={utilisateur.nom + " " + utilisateur.prenom} 
          secondary={utilisateur.role} />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{
          window.location.assign("/Acceuil")
        }}>
          <ListItemIcon>
          <i class="bi bi-toggle2-off"></i>
          </ListItemIcon>
          <ListItemText primary="Déconnecter" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
export default MenuOption;