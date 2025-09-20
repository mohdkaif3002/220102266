import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">Shorten</Button>
        <Button color="inherit" component={RouterLink} to="/stats">Statistics</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;