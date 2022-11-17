import './App.css';
import ClothingList from './ClothingList';
import { Typography, Toolbar, AppBar } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Dog Clothing
          </Typography>
        </Toolbar>
      </AppBar>
      <ClothingList /> 
    </div>
  );
}

export default App;
