import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import  {Button } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import { green } from '@material-ui/core/colors';
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

export default function MenuOption() {
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
          <ListItemIcon>
          <i class="bi bi-toggle2-off"></i>
          </ListItemIcon>
          <ListItemText primary="Déconnecter" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
          <i class="bi bi-pencil-fill"></i>
          </ListItemIcon>
          <ListItemText primary="Modifier" secondary="profil" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}