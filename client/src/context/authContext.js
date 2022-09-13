import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  usuario: null
}

if(localStorage.getItem("token")){
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token")
  }else {
    initialState.usuario = decodedToken;
  }
}

const AuthContext = createContext({
  usuario: null,
  login: (usuarioData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        usuario: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        usuario: null
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (usuarioData) => {
    localStorage.setItem("token", usuarioData.token);
    //the dispatch sets the value of the action in the reducer
    dispatch({
      type: 'LOGIN',
      payload: usuarioData
    })
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({type: 'LOGOUT'});
  }

  return (
    <AuthContext.Provider
      value={{usuario: state.usuario, login, logout}}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
