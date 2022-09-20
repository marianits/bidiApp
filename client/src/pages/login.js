import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/react-hooks'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField, Button, Container, Avatar, CssBaseline, Box, Typography, Alert } from "@mui/material"

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
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChange}
            />
            {errors.map(function(error){
              return (
                <Alert severity="error">
                  {error.message}
                </Alert>
              );
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
    </Container>
  );
}

export default Login;
