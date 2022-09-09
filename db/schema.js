const { gql } = require('apollo-server');

const typeDefs = gql `
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }
    input inputUsuario {
        nombre: String
        apellido: String
        email: String
        password: String
    }    
    type Query {
        obtenerCurso: String
    }    
    type Mutation {
        nuevoUsuario(input: inputUsuario): Usuario
    }
`;

module.exports = typeDefs;
