import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NativeSelect } from "@mui/material";

import { useState, useEffect } from "react";

export default function Addclothing(props) {
  const [producerList, setProducerList] = useState([{name: "", id: ""}]);
 
  const [open, setOpen] = useState(false);
  const [clothes, setClothes] = useState({
    name: "",
    type: "",
    price: "",
    producer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setClothes({ ...clothes, [event.target.name]: event.target.value });
  };

  const addClothes = () => {
    props.saveClothes(clothes);
    handleClose();
  };

  const fetchProducers = () => {
    fetch("http://localhost:8080/api/producers")
            .then(response => response.json())
            .then(data => setProducerList(data))
            
  }
  useEffect(() => {
    console.log("ollaan useeffect-funktiossa");
    fetchProducers();
    console.log(producerList);
}, []);

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add clothes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new clothing</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={clothes.name}
            label="Name"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="type"
            value={clothes.type}
            label="Type"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="price"
            value={clothes.price}
            label="Price"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          
          <NativeSelect>
            <option value="">Producer</option>
            {producerList.map(producer => (
                <option value="">{producer.name}</option>
            ) )}
            
            

          </NativeSelect>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addClothes}>Save clothing</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
