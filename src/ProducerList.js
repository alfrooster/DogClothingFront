import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ClothesByProducer from './ClothesByProducer';

function ProducerList () {
    //luodaan tila, johon saadaan lista valmistajista
    const [producerlist, setProducerlist] = useState([]);

    //haetaan rest-rajapinnasta vaatteet
    useEffect(() => {
        console.log("ollaan useeffect-funktiossa");
        fetchProducers();
        console.log(producerlist);
    }, []);

    const fetchProducers = () => {
        //fetch jolla haetaan tiedot vaatteista
        fetch("http://localhost:8080/api/producers")
            .then(response => response.json())
            .then(data => setProducerlist(data))
    }

    const deleteProducer = (id) => {
        console.log("deletoitu " + id);
        fetch("http://localhost:8080/api/producers/" + id , {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchProducers();
                }
            })
    }
    const saveProducer = (producers) => {
        fetch("http://localhost:8080/api/producers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producers),
        })
          .then((response) => fetchProducers())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(producers));
    }
    const [columnDefs, setColumnDefs] = useState([
        {field: 'producerid', sortable: true, filter: true},
        {field: 'name', sortable: true, filter: true},
        {
            headerName: '',
            width: 200,
            field: 'producerid',
            cellRenderer: params =>
            <ClothesByProducer id={params.value}/>
        },
        {
            headerName: '',
            width: 100,
            field: 'producerid',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteProducer(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]);

    return(
        <>
            <div className="ag-theme-alpine" style={{height: '580px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={producerlist} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} />
            </div>
        </>
    )
}

export default ProducerList;