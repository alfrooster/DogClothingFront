import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NativeSelect } from "@mui/material";


const EditClothing = (props) => {
    const [producerList, setProducerList] = useState([{name: "", id: ""}]);

    //Tuotu valitun rivin vaatteet propsien kautta steittiin
    const [clothess, setClothes] = useState(props.data);
    

    
    
      const handleClose = () => {
        props.setOpen(false);
      };
    
      const handleInputChange = (event) => {
        setClothes({ ...clothess, [event.target.name]: event.target.value });
        console.log("ipnutchange: " + JSON.stringify(event.target.value));
      };
    
      const handleProducerChange = (event) => {
        setClothes({ ...clothess, producer: {producerid: event.target.value} });
        console.log("producerchange: " + event.target.value);
      };

      const fetchClothes = props.fetchClothes;
    
      let ID = props.data;

      //Asetetaan uudet arvot ja sisällytetään id
      const addClothes = () => {
    console.log(props.data);
        updateClothes(clothess, ID);
        setClothes({
          id: props.data,
          name: "",
          type: "",
          price: "",
          producer: {
            producerid: ""
          },
        })
        handleClose();
      };
    
      const updateClothes = (clothess, ID) => {
        fetch(`http://localhost:8080/api/clothes/${ID}` , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clothess),
        })
          .then((response) => fetchClothes())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(clothess));
};

      const fetchProducers = () => {
        fetch("http://localhost:8080/api/producers")
                .then(response => response.json())
                .then(data => setProducerList(data))
                
      }
      useEffect(() => {
        console.log("ollaan useeffect-funktiossa");
        setClothes(props.data);
        fetchProducers();
        console.log(producerList);
    }, []);





return(
<div>
<Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add a new clothing</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={clothess.name}
            label="Name"
            fullWidth
            onChange={e => handleInputChange(e)}
            
          
          />
          <TextField
            margin="dense"
            name="type"
            value={clothess.type}
            label="Type"
            fullWidth
            onChange={e => handleInputChange(e)}
            
          />
          <TextField
            margin="dense"
            name="price"
            value={clothess.price}
            label="Price"
            fullWidth
            onChange={e => handleInputChange(e)}
        

          />
          
          <NativeSelect
          
          onChange={e => handleProducerChange(e)}
          name="producer">
            <option value="" selected disabled hidden>Select producer</option>
            {producerList.map(producer => (
                <option value={producer.producerid}>{producer.name}</option>
            ) )}
            
          </NativeSelect>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addClothes}>Edit clothing</Button>
        </DialogActions>
      </Dialog>
    </div>
)
}

export default EditClothing;