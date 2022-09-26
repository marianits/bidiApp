import React from 'react'
import { useState } from 'react';
import { 
  Drawer,
  Box,
  Typography,
  IconButton,
  List 
} from '@mui/material';
import {
  Link as RouterLink,
} from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Face2Icon from '@mui/icons-material/Face2';
import StyleIcon from '@mui/icons-material/Style';
import './sidebar.css';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const list = () => (
  <Box
    sx={{ width: 250 }}
    role="presentation"
  >
    <List>
      <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
      <ListItemLink to="/categorias" primary="Categorias" icon={<StyleIcon />} />
      <ListItemLink to="/autores" primary="Autores" icon={<Face2Icon />} />
    </List>
  </Box>
);

function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <IconButton 
            color= "inherit"
            size="large"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
      >
         <MenuIcon />
      </IconButton>
        <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Box p={2} width='250px' textAlign='center'>
          <Typography variant='h6' component='div'>
            Side Panel
          </Typography>
          {list()}
          </Box>
        </Drawer>
    </>
  )
}

export default Sidebar