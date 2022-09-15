import { useContext, useState }from 'react';
import { AuthContext } from '../context/authContext'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/react-hooks'

import { TextField, Button, Container, Stack, Alert } from "@mui/material"

import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router-dom'

const NUEVO_USUARIO = gql`
  mutation Mutation(
    $input: inputUsuario
  ) {
    nuevoUsuario(
      input: $input
    ) {
      email
      token
    }
  }
`
function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function nuevoUsuarioCallback(){
    console.log("Callback hit");
    nuevoUsuario();
  }
  const { onChange, onSubmit, values } = useForm(nuevoUsuarioCallback, {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [ nuevoUsuario, { loading }] = useMutation(NUEVO_USUARIO, {
    update(proxy, { data: { nuevoUsuario: usuarioData }}) {
        context.login(usuarioData);
        navigate('/');
    },
    onError({ graphQLErrors }){
      setErrors(graphQLErrors);    
    },
    variables: { input: values }
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3 style={{marginBottom: "5px"}}>Registro</h3>
      <p>Ingrese sus datos:</p>
      <br></br>
      <Stack spacing={2} paddingBottom={2}>
        <TextField 
          label="Nombre:"
          name="nombre"
          onChange={onChange}
        />
        <TextField 
          label="Apellido:"
          name="apellido"
          onChange={onChange}
        />
        <TextField 
          label="Email:"
          name="email"
          onChange={onChange}
        />
        <TextField 
          label="Password:"
          name="password"
          onChange={onChange}
        />
        <TextField 
          label="Confirmar password:"
          name="confirmPassword"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function(error){
        return (
          <Alert severity="error">
            {error.message}
          </Alert>
        );
      })}
      <Button variant="contained" onClick={onSubmit}>Registrar</Button>
    </Container>
  )
}

export default Register;
