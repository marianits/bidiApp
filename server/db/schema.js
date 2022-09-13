const { gql } = require('apollo-server');

const typeDefs = gql `
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
        token: String
    }
    type Token {
        token: String
    }
    input inputUsuario {
        nombre: String
        apellido: String
        email: String
        password: String,
        confirmPassword: String
    }
    input inputAutenticar {
        email: String,
        password: String
    }
    type Query {
        obtenerUsuario(token: String): Usuario
    }    
    type Mutation {
        nuevoUsuario(input: inputUsuario): Usuario
        autenticarUsuario(input: inputAutenticar): Usuario
    }
`;

module.exports = typeDefs;
