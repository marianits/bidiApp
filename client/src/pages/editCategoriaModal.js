import React from 'react';
import { TextField, Button, Grid, Box } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import { gql, useQuery, useMutation } from '@apollo/client';

//Obtener la cateogoria mediante el ID recibido:
const OBTENER_CATEGORIA = gql`
  query obtenerCategoriaPorID(
    $obtenerCategoriaPorIdId: ID!
  ) {
    obtenerCategoriaPorID(
      id: $obtenerCategoriaPorIdId
    ) {
      nombre
      descripcion
    }
  }
`

//Actualizar la categoria:
const EDITAR_CATEGORIA = gql`
mutation Mutation(
  $editarCategoriaId: ID!,
  $input: inputCategoria
) {
  editarCategoria(
    id: $editarCategoriaId,
    input: $input
  ) {
    nombre
    descripcion
  }
}
`

function EditCategoriaModal(props) {

  const [ editarCategoria ] = useMutation(EDITAR_CATEGORIA);

  const { loading , data, refetch } = useQuery(OBTENER_CATEGORIA, {
    variables: {obtenerCategoriaPorIdId: props.categoriaId}
  });
  if (loading) return 'Cargando...';
  setTimeout(refetch, 100);
    return (
        <Dialog open={props.show} onClose={props.close}>
          <DialogTitle>Editar Categoria:</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edite los campos y registre:
              </DialogContentText>
              <Formik
                initialValues={{
                  nombre: data.obtenerCategoriaPorID.nombre,
                  descripcion: data.obtenerCategoriaPorID.descripcion,
                }}
                onSubmit={async (values) => {
                  editarCategoria({variables: {editarCategoriaId: props.categoriaId, input: values }})
                  props.close();
                  setTimeout(props.refetch, 100);
                }}
                validationSchema={object({
                  nombre: string().required("El nombre de la categoria es requerido").min(2, "Nombre muy pequeño"),
                })}
              >
                {({ errors, isValid, touched }) => (
                  <Form>
                    <Grid item xs={12}>
                      <Field 
                      label="Nombre:"
                      name="nombre"
                      id="nombre"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.nombre) && Boolean(touched.nombre)}
                      helperText={Boolean(touched.nombre) && errors.nombre}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field 
                      label="Descripcion:"
                      name="descripcion"
                      id="descripcion"
                      as={TextField}
                      multiline={true}
                      minRows={5}
                      fullWidth
                      />
                    </Grid>
                    <Box sx={{textAlign: "right"}}>
                      <Button 
                        type="submit" 
                        variant="contained"
                        sx={{ mt: 1, mr: 1}}
                        disabled={!isValid}
                      >
                        Registrar
                      </Button>
                      <Button onClick={props.close} variant="contained" sx={{ mt: 1 }}>Cancelar</Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </DialogContent>
        </Dialog>
      )
  
}

export default EditCategoriaModal