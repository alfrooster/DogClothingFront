import './App.css';
import ClothingList from './ClothingList';
import ProducerList from './ProducerList';
import { Typography, Toolbar, AppBar } from '@mui/material';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { useState } from 'react';

function App() {
  const [tabs, setTabs] = useState("one");

  const handleChange = (event, tabs) => {
    setTabs(tabs);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Welcome to PT-app</Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={tabs} onChange={handleChange}>
          <Tab value="one" label="CLOTHINGS" />
          <Tab value="two" label="PRODUCERS" />
      </Tabs>
      {tabs === "one" && (
        <div>
          <ClothingList />
        </div>
      )}
      {tabs === "two" && (
        <div>
          <ProducerList />
        </div>
      )}
      
    </div>
  );
}

export default App;