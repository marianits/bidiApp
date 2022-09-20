import { useContext, useState }from 'react';
import { AuthContext } from '../context/authContext';
import { Field, Formik, Form } from 'formik';
import { object, string, ref } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar,
  TextField,
  Button,
  Alert,
  Grid,
  Box,
  Typography,
  CssBaseline
} from "@mui/material";
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

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
  const [_errors, setErrors] = useState([]);
  const [_values, setValues] = useState({});

  const updateCache = (cache, { data: { nuevoUsuario: usuarioData }} ) => {
    context.login(usuarioData);
    navigate('/');
  };

  const [ nuevoUsuario, { loading }] = useMutation(NUEVO_USUARIO, {
    update: updateCache,
    onError({ graphQLErrors }){
      setErrors(graphQLErrors);    
    },
  });

  return (
    <Formik
      initialValues={{
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={async (values) => {
        console.log(values);
        nuevoUsuario({variables: {input: values}})
      }}
      validationSchema={object({
        email: string().required("El email es requerido").email("Email inválido"),
        nombre: string().min(2, "Nombre muy pequeño"),
        apellido: string().min(2, "Apellido muy pequeño"),
        password: string().required().min(7, "El password debería tener al menos 7 caracteres"),
        confirmPassword: string().required().oneOf([ref('password'),null], 'Los passwords deben coincidir')
      })}
    >
      {({errors, isValid, touched, dirty}) => (
        <Form>
        < CssBaseline />
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
              Registro
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field 
                    label="Nombre:"
                    name="nombre"
                    id="nombre"
                    as={TextField}
                    fullWidth
                    error={Boolean(errors.nombre) && Boolean(touched.nombre)}
                    helperText={Boolean(touched.nombre) && errors.nombre}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field 
                    label="Apellido:"
                    name="apellido"
                    id="apellido"
                    as={TextField}
                    fullWidth
                    error={Boolean(errors.apellido) && Boolean(touched.apellido)}
                    helperText={Boolean(touched.apellido) && errors.apellido}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field 
                    label="Email:"
                    name="email"
                    id="email"
                    as={TextField}
                    fullWidth
                    error={Boolean(errors.email) && Boolean(touched.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field 
                    label="Password:"
                    name="password"
                    as={TextField}
                    fullWidth
                    id="password"
                    type="password"
                    error={Boolean(errors.password) && Boolean(touched.password)}
                    helperText={Boolean(touched.password) && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field 
                    label="Confirmar password:"
                    name="confirmPassword"
                    as={TextField}
                    fullWidth
                    id="confirmPassword"
                    type="password"
                    error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                    helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              {_errors.map(function(error){
                return (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {error.message}
                  </Alert>
                );
              })}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!dirty || !isValid}
              >
                Registrarse
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default Register;
