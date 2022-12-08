import './App.css';
import Login from './Login';
import { Typography, Toolbar, AppBar } from '@mui/material';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Welcome to PT-app</Typography>
        </Toolbar>
      </AppBar>
      <Login />
      
    </div>
  );
}

export default App;