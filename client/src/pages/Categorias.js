import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Button, Container, Box, Typography, Link, Paper } from "@mui/material";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NewCategoriaModal from './newCategoriaModal';
import EditCategoriaModal from './editCategoriaModal';

const OBTENER_CATEGORIAS = gql`
  query obtenerCategorias {
    obtenerCategorias {
      id
      nombre
      descripcion
    }
  }
`;

const ELIMINAR_CATEGORIA = gql`
  mutation EliminarCategoria(
    $eliminarCategoriaId: ID!
  ){
    eliminarCategoria(
      id: $eliminarCategoriaId
    )
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function Categorias() {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoriaId, setCategoriaId] = useState('');

  const { loading, error, data, refetch } = useQuery(OBTENER_CATEGORIAS);
  const [ eliminarCategoria ] = useMutation(ELIMINAR_CATEGORIA);
  if (loading) return 'Cargando...';
  if (error) return `Error! ${error.message}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const editarCategoria = (id) => {
    setOpenEdit(true);
    setCategoriaId(id)
  };

  const _eliminarCategoria = (id) => {
    eliminarCategoria({ variables: { eliminarCategoriaId: id }});
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <NewCategoriaModal show={open} close={() => setOpen(false)} refetch={() => refetch()}></NewCategoriaModal>
        <EditCategoriaModal
          show={openEdit}
          close={() => setOpenEdit(false)}
          categoriaId={categoriaId}
          refetch={() => refetch()}
        ></EditCategoriaModal>   
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                CATEGORIAS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                  NUEVO
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="left">Descripcion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.obtenerCategorias.map((categoria) => (
                <TableRow key={categoria.ID}>
                  <TableCell align="right">{categoria.id}</TableCell>
                  <TableCell align="left">{categoria.nombre}</TableCell>
                  <TableCell align="left">{categoria.descripcion}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button
                        color="secondary" 
                        variant="contained" 
                        onClick={() => editarCategoria(categoria.id)}
                        sx={{mr: 1}}
                      >
                        Editar
                      </Button>
                      <Button color="error" variant="contained" onClick={() => {
                        _eliminarCategoria(categoria.id);
                        setTimeout(refetch, 100);
                      }}>Eliminar</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div> 
  );
}

export default Categorias