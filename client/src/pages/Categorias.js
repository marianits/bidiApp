import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button, Container, Avatar, CssBaseline, Box, Typography, Alert } from "@mui/material"
import StyleIcon from '@mui/icons-material/Style';
import NewCategoriaModal from './newCategoriaModal';

const OBTENER_CATEGORIA = gql`
  query obtenerCategoria {
    obtenerCategoria {
      id
      nombre
      descripcion
    }
  }
`;

//Configuracion de las columnas de la tabla
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'descripcion', headerName: 'Descripcion', width: 130 },
  { field: 'acciones',
    type: 'actions',
    headerName: 'Acciones',
    width: 150,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Eliminar"
      />,
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Editar"
      />,
    ]
  }
];

function Categorias() {
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery(OBTENER_CATEGORIA);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <StyleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Categorias
          </Typography>
          <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
          <NewCategoriaModal show={open} close={() => setOpen(false)}/>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data.obtenerCategoria}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Box>        
    </>  
  );
}

export default Categorias