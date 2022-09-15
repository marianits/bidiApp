import { useContext, useState }from 'react';
import { AuthContext } from '../context/authContext'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/react-hooks'

import { TextField, Button, Container, Stack, Alert } from "@mui/material"

import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router-dom'

const AUTENTICAR_USUARIO = gql`
  mutation AutenticarUsuario(
    $input: inputAutenticar
  ) {
    autenticarUsuario(
      input: $input
    ) {
      email
      token
    }
  }
`
function Login(props){
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [ errors, setErrors ] = useState([]);

  function autenticarUsuarioCallback() {
      autenticarUsuario();
  }

  const { onChange, onSubmit, values } = useForm(autenticarUsuarioCallback, {
    email: '',
    password: ''
  });

  const [ autenticarUsuario, { loading }] = useMutation(AUTENTICAR_USUARIO, {
    update(proxy, { data: { autenticarUsuario: usuarioData }}) {
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
      <h3 style={{marginBottom: "5px"}}>Login:</h3>
      <p>Ingrese sus datos:</p>
      <br></br>
      <Stack spacing={2} paddingBottom={2}>
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
      </Stack>
      {errors.map(function(error){
        return (
          <Alert severity="error">
            {error.message}
          </Alert>
        );
      })}
      <Button variant="contained" onClick={onSubmit}>Login</Button>
    </Container>
  );
}

export default Login;
