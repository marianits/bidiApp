import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  }
  console.log(usuario);
  return(
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h5' component="div">
            <Link to="/" style={{textDecoration: "none", color: "white"}}>BidiApp</Link>
          </Typography>
          <Box alignItems="right" sx={{flexGrow: 1, textAlign: "right"}}>
            {  usuario ?
                <>
                  <Button style={{textDecoration: "none", color: "white"}} onClick={onLogout}>Logout</Button>
                </>
              :
                <>
                  <Link to="/login" style={{textDecoration: "none", color: "white", marginRight: "10px"}}>
                    Login
                  </Link>
                  <Link to="/registro" style={{textDecoration: "none", color: "white"}}>
                    Registro
                  </Link>
                </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
