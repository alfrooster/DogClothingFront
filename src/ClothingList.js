import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Addclothing from './Addclothing'
import CreateIcon from '@mui/icons-material/Create';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import EditClothing from './EditClothing';


function ClothingList () {
    //luodaan tila, johon saadaan lista vaatteista
    const [clothes, setClothes] = useState([]);
    const [open, setOpen] = useState(false);
    const [clothe, setClothe] = useState([])
    

    //haetaan rest-rajapinnasta vaatteet
    useEffect(() => {
        console.log("ollaan useeffect-funktiossa");
        fetchClothes();
        console.log(clothes);
    }, []);

    const fetchClothes = () => {
        //fetch jolla haetaan tiedot vaatteista
        fetch("http://localhost:8080/api/clothes")
            .then(response => response.json())
            .then(data => setClothes(data))
    }

    const deleteClothing = (id) => {
        console.log("deletoitu " + id);
        fetch("http://localhost:8080/api/clothes/" + id , {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchClothes();
                }
            }) }


    const handleClickOpen = (data) => {
        setOpen(true);
        setClothe(data);
       console.log(data)
       console.log("handleclickopen")
      };

    const saveClothes = (clothes) => {
        fetch("http://localhost:8080/api/clothes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clothes),
        })
          .then((response) => fetchClothes())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(clothes));
    }
    const [columnDefs, setColumnDefs] = useState([
        {field: 'name', sortable: true, filter: true},
        {field: 'producer.name', sortable: true, filter: true},
        {field: 'type', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {
            headerName: '',
            width: 100,
            field: 'id',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteClothing(params.value)}>
                <DeleteIcon />
            </IconButton>
        }, { headerName: '',
        width: 100,
        field: 'id',
        cellRenderer: params =>
        <IconButton color="primary" onClick={() => handleClickOpen(params.data)}>
            <CreateIcon />
        </IconButton> }
    ]) ;

    return(
        <>
            <Addclothing saveClothes={saveClothes} />
            <EditClothing  open={open} setOpen={setOpen}  data={clothe} clothes={clothes} fetchClothes={fetchClothes}  />
            <div className="ag-theme-alpine" style={{height: '580px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={clothes} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} />
            </div>
        </>
    )
} 

export default ClothingList;