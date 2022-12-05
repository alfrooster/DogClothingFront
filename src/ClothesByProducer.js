import React, { useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ClothesByProducer(props) {
  const [clothings, setClothings] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    fetchClothings();
    console.log(clothings);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClothings([]);
  };

  const fetchClothings = () => {
    //fetch jolla haetaan tiedot vaatteista
    fetch("http://localhost:8080/rest/producers/" + props.id + "/clothings")
        .then(response => response.json())
        .then(data => setClothings(data._embedded.clothings))
  }
  
  return (
    <div>
      <Button
        style={{ margin: 0 }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Show clothes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Clothing items of producer {props.id}</DialogTitle>
        <DialogContent>
          <table>
            <tr>
              <td><b>Name</b></td>
              <td><b>Type</b></td>
              <td><b>Price</b></td>
            </tr>
            {clothings.map(clothing => (
                <tr>
                  <td>{clothing.name}</td>
                  <td>{clothing.type}</td>
                  <td>{clothing.price}</td>
                </tr>
            ) )}
          </table>          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}