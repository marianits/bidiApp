// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"
import client from './apolloClient';
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext'
import './index.css';
//La aplicación en React necesita acceso a:
// Al client de apolloClient.js
// Authorization Context
// Browser Router (React Router) /login /register

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />    
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);