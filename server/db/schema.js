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
    type Categoria {
        id: ID
        nombre: String
        descripcion: String
    }
    type Token {
        token: String
    }
    input inputCategoria {
        nombre: String!
        descripcion: String
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
        #Productos
        obtenerCategoria: [Categoria]
    }    
    type Mutation {
        #usuarios
        nuevoUsuario(input: inputUsuario): Usuario
        autenticarUsuario(input: inputAutenticar): Usuario
        #categorias
        nuevaCategoria(input: inputCategoria): Categoria
    }
`;

module.exports = typeDefs;
