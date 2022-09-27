import React from 'react';
import { TextField, Button, Grid, Box } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';

const NUEVA_CATEGORIA = gql`
  mutation Mutation(
    $input: inputCategoria
  ) {
    nuevaCategoria(
      input: $input
    ) {
      nombre
    }
  }
`

function NewCategoriaModal(props) {
  const updateCache = () => {
  };
  const [ nuevaCategoria, { loading }] = useMutation(NUEVA_CATEGORIA, {
    update: updateCache,
    onError({ graphQLErrors }){
      setErrors(graphQLErrors);    
    }
  });
  return (
    <Dialog open={props.show} onClose={props.close}>
      <DialogTitle>Nueva Categoria:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Añada los campos para registrar la nueva categoria:
          </DialogContentText>
          <Formik
            initialValues={{
              nombre: '',
              descripcion: '',
            }}
            onSubmit={async (values) => {
              console.log(values);
              nuevaCategoria({variables: {input: values}});
              {props.close};
            }}
            validationSchema={object({
              nombre: string().required("El nombre de la categoria es requerido").min(2, "Nombre muy pequeño"),
            })}
          >
            {({errors, isValid, touched, dirty}) => (
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
                    disabled={!dirty || !isValid}
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

export default NewCategoriaModal