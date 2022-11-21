import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Addclothing from './Addclothing'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function ClothingList () {
    //luodaan tila, johon saadaan lista vaatteista
    const [clothes, setClothes] = useState([]);

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

    const deleteClothing = (link) => {
        console.log("deletoitu");
        fetch(link, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchClothes();
                }
            })
    }
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
            field: '_links.self.href',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteClothing(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]);

    return(
        <>
            <Addclothing saveClothes={saveClothes} />
            <div className="ag-theme-alpine" style={{height: '580px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={clothes} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} />
            </div>
        </>
    )
}

export default ClothingList;